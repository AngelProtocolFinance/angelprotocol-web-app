import Icon from "components/Icon";
import { useGetter, useSetter } from "store/accessors";
import { toggle } from "slices/components/marketFilter";
import Search from "./Search";
import Sorter from "./Sorter";

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
        className="min-w-[10rem] btn-orange flex items-center gap-2 justify-between rounded-md px-3 py-2 text-sm"
      >
        <Icon type="Filter" size={20} />
        <span>{isFilterOpen ? "Hide filters" : "Show filters"}</span>
      </button>
      <Search classes="order-first col-span-2 md:order-none md:col-span-1" />
      <Sorter />
    </div>
  );
}
