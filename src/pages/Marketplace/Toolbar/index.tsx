import Icon from "components/Icon";
import { useGetter, useSetter } from "store/accessors";
import { toggle } from "slices/components/marketFilter";
import Search from "./Search";

// import Sorter from "./Sorter";

export default function Toolbar({ classes = "" }: { classes?: string }) {
  const isFilterOpen = useGetter(
    (state) => state.component.marketFilter.isOpen
  );
  const dispatch = useSetter();
  function toggleFilter() {
    dispatch(toggle());
  }

  return (
    <div
      className={`${classes} grid grid-cols-2 md:grid-cols-[auto_1fr_auto] gap-3`}
    >
      <button
        onClick={toggleFilter}
        className="btn btn-orange rounded-lg w-40 h-10 px-3 py-2 text-sm"
      >
        <Icon type="Filter" size={24} className="mr-auto" />
        <span>{isFilterOpen ? "Hide filters" : "Show filters"}</span>
      </button>
      <Search classes="order-first col-span-2 md:order-none md:col-span-1" />
      {/* <Sorter /> */}
    </div>
  );
}
