const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
const { createClient } = require("@libsql/client");
const { PrismaLibSql } = require("@prisma/adapter-libsql");
const { PrismaClient } = require("@prisma/client");

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error("No database URL found");
  process.exit(1);
}

const libsql = createClient({
  url,
  authToken,
});

// Monkey-patch url and authToken properties if missing (Prisma adapter might need them)
if (!libsql.url) {
  libsql.url = url;
}
if (!libsql.authToken) {
  libsql.authToken = authToken;
}

const adapter = new PrismaLibSql(libsql);
const prisma = new PrismaClient({ adapter });

const SPECIALIZATIONS = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "General Practice",
  "Gynecology",
  "Ophthalmology",
  "Urology",
  "Dentist",
  "ENT",
];

const CITIES = [
  "New York",
  "London",
  "Dubai",
  "Singapore",
  "Toronto",
  "Berlin",
];

const FIRST_NAMES = [
  "James",
  "Mary",
  "John",
  "Patricia",
  "Robert",
  "Jennifer",
  "Michael",
  "Linda",
  "William",
  "Elizabeth",
  "David",
  "Barbara",
  "Richard",
  "Susan",
  "Joseph",
  "Jessica",
  "Thomas",
  "Sarah",
  "Charles",
  "Karen",
];
const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  console.log("Seeding database...");

  for (let i = 0; i < 50; i++) {
    const firstName = getRandomElement(FIRST_NAMES);
    const lastName = getRandomElement(LAST_NAMES);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
    const phone = `+1${getRandomInt(1000000000, 9999999999)}`;

    const specialization = getRandomElement(SPECIALIZATIONS);
    const city = getRandomElement(CITIES);
    const feeOnline = getRandomInt(50, 200);
    const feeInClinic = getRandomInt(80, 300);
    const experience = getRandomInt(2, 30);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          phone,
          name,
          role: "DOCTOR",
          doctorProfile: {
            create: {
              specialization,
              clinicName: `${lastName} Clinic`,
              clinicAddress: `${getRandomInt(1, 999)} Main St`,
              city,
              bio: `Experienced ${specialization} specialist with over ${experience} years of practice. Committed to providing high-quality patient care.`,
              yearsOfExperience: experience,
              feeOnline,
              feeInClinic,
              supportsOnline: Math.random() > 0.3,
              supportsInClinic: Math.random() > 0.3,
              isApproved: true,
              availability: {
                create: [1, 2, 3, 4, 5].map((day) => ({
                  dayOfWeek: day,
                  startTime: "09:00",
                  endTime: "17:00",
                  isOnline: true,
                  isInClinic: true,
                })),
              },
            },
          },
        },
      });
      console.log(`Created doctor: ${name} (${specialization})`);
    } catch (e) {
      console.error(`Failed to create doctor ${email}:`, e.message);
    }
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
