import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search({ classes = "" }: { classes?: string }) {
  const [params, setParams] = useSearchParams();
  const q = params.get("query") || "";
  const [search, setSearch] = useState(q);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const n = new URLSearchParams(params);
        n.set("query", e.currentTarget.query.value);
        setParams(n, { replace: true });
      }}
      className={`${classes} flex gap-2 items-center`}
    >
      <input
        onChange={(e) => {
          const s = e.target.value;
          //user deleted all text
          setSearch(s);
          if (!s && q) {
            const n = new URLSearchParams(params);
            n.delete("query");
            setParams(n, { replace: true });
          }
        }}
        type="search"
        name="query"
        value={search}
        className="w-full h-full p-3 placeholder:text-navy-l3 text-navy-d4 font-medium font-heading border border-gray-l4 rounded-lg outline-blue-d1 outline-offset-4"
        placeholder={q || "Search organizations..."}
      />
      <button
        disabled={!search}
        type="submit"
        className="rounded-lg border border-gray-l4 h-full p-3 enabled:hover:border-blue-d1 enabled:hover:text-blue-d1 disabled:text-gray"
      >
        <SearchIcon size={20} />
      </button>
    </form>
  );
}
