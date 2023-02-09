import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { useCallback } from "react";
import Icon from "components/Icon";
import { useGetter, useSetter } from "store/accessors";
import { setSearchText, toggle } from "slices/components/marketFilter";
import Search from "./Search";

// import Sorter from "./Sorter";

export default function Toolbar({ classes = "" }: { classes?: string }) {
  const isFilterOpen = useGetter(
    (state) => state.component.marketFilter.isOpen
  );
  const queryStatus = useGetter(
    (state) => state.aws.queries.endowments?.status
  );

  const dispatch = useSetter();

  function toggleFilter() {
    dispatch(toggle());
  }

  const handleSearch = useCallback(
    (query: string) => dispatch(setSearchText(query)),
    [dispatch]
  );

  return (
    <div
      className={`${classes} grid grid-cols-2 md:grid-cols-[auto_1fr] gap-3`}
    >
      <button
        onClick={toggleFilter}
        className="btn-orange rounded-lg w-40 h-10 px-3 py-2 text-sm"
      >
        <Icon type="Filter" size={24} className="mr-auto" />
        <span>{isFilterOpen ? "Hide filters" : "Show filters"}</span>
      </button>
      <Search
        classes="order-first col-span-2 md:order-none md:col-span-1"
        isSearching={queryStatus === QueryStatus.pending}
        onChange={handleSearch}
        placeholder="Search organizations..."
      />
      {/* <Sorter /> */}
    </div>
  );
}
