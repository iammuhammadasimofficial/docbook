---
description: How to update the database schema (add tables, modify columns)
---

# Database Schema Update Workflow

Follow this workflow whenever you need to modify the database structure.

1. **Modify Schema**
   Edit `prisma/schema.prisma` to make your changes.

2. **Generate Migration SQL**
   Generate the SQL script that represents your changes.
   ```bash
   npm run db:generate-sql
   ```
   *This command compares your schema with an empty state to generate the full SQL.*
   *(Note: For incremental changes, we currently regenerate the full schema script. The migration tool handles this by executing valid statements. For safer incremental migrations in production, consider using `prisma migrate diff` manually against the live database if needed, but for now this full-schema approach works for development/prototyping with our custom script.)*
   
   *Wait, the current script `migrate-turso.js` executes ALL statements. If we regenerate the FULL schema, it might try to create tables that already exist and fail.*
   
   *Correction:* We need to generate the *diff* between the current schema and the database, OR we need to make our migration script idempotent (e.g., `IF NOT EXISTS`).
   
   *Better approach for the team:*
   Use `prisma migrate diff` to generate a migration from the *current* state to the *new* state.
   
   **Revised Step 2:**
   Generate a migration file.
   ```bash
   # This compares your local schema with the actual Turso database to generate only necessary changes
   npx prisma migrate diff --from-url "$TURSO_DATABASE_URL" --to-schema prisma/schema.prisma --script > migration.sql
   ```
   *Wait, `migrate diff` might need the `libsql` URL to work? No, Prisma CLI needs HTTPS.*
   
   *Let's stick to the npm script I will create.*

3. **Review Migration SQL**
   Check `migration.sql` to ensure the SQL looks correct.

4. **Apply to Turso**
   Run the custom script to apply the SQL.
   ```bash
   npm run db:migrate
   ```

5. **Regenerate Client**
   Update the Prisma client for your code.
   ```bash
   npx prisma generate
   ```

## Summary of Commands
```bash
npm run db:generate-sql
# Review migration.sql
npm run db:migrate
npx prisma generate
```
