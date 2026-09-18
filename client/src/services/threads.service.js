import apiClient from "./apiClient";

// Passes the filter values as query params. Axios turns { search, sort }
// into  ?search=...&sort=...  — visible in the Network tab.
export async function getThreads({ search, sort }) {
  const res = await apiClient.get("/api/threads", {
    params: { search, sort },
  });
  return res.data.threads;
}
