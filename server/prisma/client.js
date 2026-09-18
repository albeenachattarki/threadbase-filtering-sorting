import { PrismaClient } from "@prisma/client";

// log: ["query"] prints every SQL statement Prisma runs to the terminal.
// This is how you PROVE the database is doing the filtering — you will see
// a `SELECT ... WHERE ... ILIKE '%...%'` line each time you search.
const prisma = new PrismaClient({
  log: ["query"],
});

export default prisma;
