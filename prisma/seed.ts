import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const teams = [
  { name: "Georgia" },
  { name: "Michigan" },
  { name: "Ohio State" },
  { name: "Texas" },
  { name: "Alabama" },
  { name: "Oregon" },
  { name: "Penn State" },
  { name: "Notre Dame" },
  { name: "Florida State" },
  { name: "Ole Miss" },
  { name: "Washington" },
  { name: "LSU" },
  { name: "Tennessee" },
  { name: "Oklahoma" },
  { name: "Utah" },
  { name: "Clemson" },
  { name: "Miami" },
  { name: "Kansas State" },
  { name: "Arizona" },
  { name: "Missouri" },
  { name: "Texas A&M" },
  { name: "Louisville" },
  { name: "Oklahoma State" },
  { name: "North Carolina" },
  { name: "Iowa" },
  { name: "NC State" },
  { name: "UCF" },
  { name: "South Carolina" },
  { name: "Colorado" },
  { name: "Nebraska" },
  { name: "Wisconsin" },
  { name: "Texas Tech" },
  { name: "Florida" },
  { name: "Auburn" },
  { name: "Kentucky" },
  { name: "Arkansas" },
  { name: "Washington State" },
  { name: "West Virginia" },
  { name: "Kansas" },
  { name: "BYU" },
  { name: "Minnesota" },
  { name: "Purdue" },
  { name: "Michigan State" },
  { name: "Northwestern" },
  { name: "Iowa State" },
  { name: "Illinois" },
  { name: "Boston College" },
  { name: "Duke" },
  { name: "Syracuse" },
  { name: "Virginia Tech" },
];

async function main() {
  await prisma.team.deleteMany();             // clear any old data
  await prisma.team.createMany({ data: teams }); // insert fresh list
  console.log(`Seeded ${teams.length} teams!`);
}

main()
  .catch(async (e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

