import prisma from "./client.js";

// Titles chosen so search + sort are easy to see:
//  - several contain "React" / "react" (mixed case → proves insensitive)
//  - spread createdAt so "newest" vs "oldest" visibly reorders
async function main() {
  await prisma.comment.deleteMany();
  await prisma.thread.deleteMany();
  await prisma.author.deleteMany();

  const ada = await prisma.author.create({
    data: { name: "Ada", avatarUrl: "/avatars/ada.svg" },
  });
  const linus = await prisma.author.create({
    data: { name: "Linus", avatarUrl: "/avatars/linus.svg" },
  });
  const grace = await prisma.author.create({
    data: { name: "Grace", avatarUrl: "/avatars/grace.svg" },
  });

  const day = (n) => new Date(Date.now() - n * 86_400_000);

  const rows = [
    { title: "React Query caching basics", body: "How the cache key works.", authorId: ada.id, createdAt: day(1) },
    { title: "Debouncing a REACT search box", body: "Mixed-case title on purpose.", authorId: linus.id, createdAt: day(2) },
    { title: "Express req.query deep dive", body: "Reading params on the server.", authorId: grace.id, createdAt: day(3) },
    { title: "Prisma where and orderBy", body: "Filtering in the database.", authorId: ada.id, createdAt: day(4) },
    { title: "reactivity vs re-rendering", body: "Lowercase react inside a word.", authorId: linus.id, createdAt: day(5) },
    { title: "Anonymous roadmap thread", body: "No author on this row.", authorId: null, createdAt: day(6) },
    { title: "Indexing for fast search", body: "Why the DB beats a JS loop.", authorId: grace.id, createdAt: day(7) },
    { title: "Ghost thread about React hooks", body: "Author-less + matches react.", authorId: null, createdAt: day(8) },
  ];

  for (const r of rows) {
    const t = await prisma.thread.create({ data: r });
    const n = (t.id % 3) + 1;
    await prisma.comment.createMany({
      data: Array.from({ length: n }, (_, i) => ({
        body: `Comment ${i + 1} on ${t.title}`,
        threadId: t.id,
      })),
    });
  }

  console.log("✅ Seeded authors, threads, and comments");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
