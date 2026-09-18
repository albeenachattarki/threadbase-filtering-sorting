import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getThreads } from "../services/threads.service";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "./SearchBar.jsx";
import SortDropdown from "./SortDropdown.jsx";
import ThreadItem from "./ThreadItem.jsx";

export default function ThreadList() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const debouncedSearch = useDebounce(search, 300);

  const { data, isPending, isError, error } = useQuery({
    // filters live in the key → each combo is cached and re-fetched
    queryKey: ["threads", { search: debouncedSearch, sort }],
    queryFn: () => getThreads({ search: debouncedSearch, sort }),
    placeholderData: keepPreviousData,
  });

  const threads = data ?? [];

  return (
    <div>
      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {isPending && <p className="muted">Loading threads…</p>}
      {isError && <p className="error">Could not load threads: {error.message}</p>}
      {!isPending && !isError && threads.length === 0 && (
        <p className="muted">No threads match “{debouncedSearch}”.</p>
      )}

      <ul className="threads">
        {threads.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} />
        ))}
      </ul>
    </div>
  );
}
