import ThreadList from "./components/ThreadList.jsx";

export default function App() {
  return (
    <div className="wrap">
      <h1>Threadbase</h1>
      <p className="muted">
        The search box and sort dropdown are wired to the API. Your job is on the
        server: make <code>GET /api/threads</code> filter with a Prisma
        <code> where </code>and <code> orderBy</code> instead of an in-memory array.
      </p>
      <ThreadList />
    </div>
  );
}
