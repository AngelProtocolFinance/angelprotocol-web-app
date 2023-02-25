import Icon from "@giving/components/Icon";
import useDebouncer from "@giving/hooks/useDebouncer";
import { setSearchText } from "@giving/slices/components/marketFilter";
import { useGetter, useSetter } from "@giving/store";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";

export default function Search({ classes = "" }: { classes?: string }) {
  const dispatch = useSetter();
  const [query, setQuery] = useState("");

  const queryStatus = useGetter(
    (state) => state.aws.queries.endowments?.status
  );

  const [debouncedQuery, isDebouncing] = useDebouncer(query, 500);

  useEffect(() => {
    dispatch(setSearchText(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  const isLoading = queryStatus === QueryStatus.pending || isDebouncing;

  return (
    <div
      className={`${classes} flex gap-2 items-center  dark:text-gray-l3 border border-prim rounded-lg overflow-clip`}
    >
      <Icon
        type={isLoading ? "Loading" : "Search"}
        size={20}
        className={`ml-2 ${isLoading ? "animate-spin" : ""}`}
      />
      <input
        value={query}
        onChange={({ target: { value } }) => setQuery(value)}
        className="focus:outline-none w-full py-2 pr-3 bg-transparent dark:placeholder:text-gray-l3"
        placeholder="Search organizations..."
      />
    </div>
  );
}
