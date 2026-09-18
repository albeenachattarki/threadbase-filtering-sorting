# Filtering and Sorting — React State → Express → Prisma (Starter)

The React search box and sort dropdown are **already wired**: they pass
`?search=` and `?sort=` to `GET /api/threads`. The problem is the server —
it reads those params but filters and sorts an **in-memory array** with
JavaScript after loading every row.

**Your task:** rewrite `server/routes/threads.js` so the query is built from
`req.query` and executed by the **database** — a Prisma `where` and `orderBy`,
no `.filter()` / `.sort()` left in the handler.

## Prerequisites
- Node.js 18+
- Docker (for the Postgres database) — or your own PostgreSQL instance

> `mode: "insensitive"` (case-insensitive search) requires **PostgreSQL**,
> which is why this project uses Postgres rather than SQLite.

## Setup
```bash
npm run setup                     # install root + server + client
cp server/.env.example server/.env
cp client/.env.development.example client/.env.development
npm run db:up                     # start Postgres via docker compose
npm --prefix server run db:setup  # prisma migrate dev
npm --prefix server run db:seed   # seed authors, threads, comments
```

## Run
```bash
npm run dev
```
- client: `http://localhost:5173`
- server: `http://localhost:3001` (watch this terminal for the Prisma query log)

## What you edit
Only:
- `server/routes/threads.js`

Do **not** edit the React side — it already sends the params correctly.

## Success looks like
1. Typing in the search box shows `?search=` in the **Network tab** request URL.
2. The **server terminal** prints a Prisma query with a `WHERE ... ILIKE '%…%'` clause.
3. There is **no** `.filter()` or `.sort()` left in the route handler.
