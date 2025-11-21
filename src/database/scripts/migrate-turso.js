require('dotenv').config();
const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
    console.error('No database URL found');
    process.exit(1);
}

console.log('Connecting to:', url);

const client = createClient({
    url,
    authToken,
});

async function main() {
    const args = process.argv.slice(2);
    const sqlPath = args[0] ? path.resolve(args[0]) : path.join(__dirname, '..', 'migration.sql');

    console.log('Reading migration from:', sqlPath);

    if (!fs.existsSync(sqlPath)) {
        console.error('Migration file not found:', sqlPath);
        console.error('Usage: node src/database/scripts/migrate-turso.js <path-to-sql-file>');
        process.exit(1);
    }

    let sql = fs.readFileSync(sqlPath, 'utf8');

    // Remove comments
    sql = sql.replace(/--.*$/gm, '');

    // Split by semicolon
    const statements = sql.split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    if (statements.length === 0) {
        console.log('No SQL statements found');
        return;
    }

    console.log(`Found ${statements.length} statements. Executing...`);

    for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        console.log(`Executing statement ${i + 1}/${statements.length}...`);
        try {
            await client.execute(stmt);
        } catch (e) {
            console.error(`Failed to execute statement ${i + 1}:`);
            console.error(stmt);
            console.error('Error:', e);
            process.exit(1);
        }
    }

    console.log('Migration completed successfully!');
}

main();
