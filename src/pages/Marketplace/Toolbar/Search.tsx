import { QueryStatus } from "@reduxjs/toolkit/query";
import Icon from "components/Icon";
import useDebouncer from "hooks/useDebouncer";
import { useEffect } from "react";
import { useGetter } from "store/accessors";
import { useMarketplaceContext } from "../Context";

export default function Search({ classes = "" }: { classes?: string }) {
  const { state, update } = useMarketplaceContext();

  const queryStatus = useGetter(
    (state) => state.aws.queries.endowments?.status
  );

  const [debouncedQuery, isDebouncing] = useDebouncer(state.searchText, 500);

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
        value={state.searchText}
        onChange={(e) => update({ searchText: e.target.value })}
        className="w-full py-2 pr-3 placeholder:text-navy-l3 text-navy-d4 font-medium font-heading"
        placeholder="Search organizations..."
      />
    </div>
  );
}
