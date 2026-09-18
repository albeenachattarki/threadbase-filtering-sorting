import { Router } from "express";
import prisma from "../prisma/client.js";

const router = Router();

// GET /api/threads?search=<term>&sort=<newest|oldest>
router.get("/", async (req, res, next) => {
  try {
    const { search, sort } = req.query;

    let threads = await prisma.thread.findMany({
      include: {
        author: { select: { name: true, avatarUrl: true } },
        _count: { select: { comments: true } },
      },
    });

    if (search) {
      threads = threads.filter((t) =>
        t.title.toLowerCase().includes(String(search).toLowerCase())
      );
    }

    if (sort === "oldest") {
      threads.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      threads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json({ threads });
  } catch (error) {
    next(error);
  }
});

export default router;
