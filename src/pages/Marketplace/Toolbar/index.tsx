import Icon from "components/Icon";
import { useGetter, useSetter } from "store/accessors";
import { toggle } from "slices/components/marketFilter";

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
      <div className="flex gap-2 order-first col-span-2 md:order-none md:col-span-1 items-center  dark:text-gray-l2 border border-gray-l2 dark:border-bluegray-d1 rounded-md overflow-clip">
        <Icon type="Search" size={20} className="ml-2" />
        <input
          className="focus:outline-none w-full py-2 pr-3 bg-transparent dark:placeholder:text-gray-l2"
          placeholder="Search organizations..."
        />
      </div>
      <button className="min-w-[10rem] flex items-center justify-between gap-3 text-sm py-2 px-3 dark:text-gray-l2 border border-gray-l2 dark:border-bluegray-d1 rounded-md uppercase">
        <span>sort by</span>
        <Icon type="ArrowDown" />
      </button>
    </div>
  );
}
