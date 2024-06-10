import { QueryStatus } from "@reduxjs/toolkit/query";
import Icon from "components/Icon";
import useDebouncer from "hooks/useDebouncer";
import { useEffect, useState } from "react";
import { useGetter } from "store/accessors";
import { useMarketplaceContext } from "../Context";

export default function Search({ classes = "" }: { classes?: string }) {
  const { update } = useMarketplaceContext();
  const [query, setQuery] = useState("");

  const queryStatus = useGetter(
    (state) => state.aws.queries.endowments?.status
  );

  const [debouncedQuery, isDebouncing] = useDebouncer(query, 500);

  useEffect(() => {
    update({ searchText: debouncedQuery });
  }, [debouncedQuery, update]);

  const isLoading = queryStatus === QueryStatus.pending || isDebouncing;

  return (
    <div
      className={`${classes} flex gap-2 items-center rounded-lg overflow-clip field-container`}
    >
      <Icon
        type={isLoading ? "Loading" : "Search"}
        size={20}
        className={`ml-2 ${isLoading ? "animate-spin" : ""}`}
      />
      <input
        value={query}
        onChange={({ target: { value } }) => setQuery(value)}
        className="w-full py-2 pr-3 placeholder:text-navy-l3 text-navy-d4 font-medium font-heading"
        placeholder="Search organizations..."
      />
    </div>
  );
}
