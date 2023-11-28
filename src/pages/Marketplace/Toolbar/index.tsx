import Icon from "components/Icon";
import { useSetter } from "store/accessors";
import { toggle } from "slices/components/marketFilter";
import Search from "./Search";

// import Sorter from "./Sorter";

export default function Toolbar({ classes = "" }: { classes?: string }) {
  const dispatch = useSetter();
  function toggleFilter() {
    dispatch(toggle());
  }

  return (
    <div
      className={`${classes} grid grid-cols-2 md:grid-cols-[auto_1fr] gap-3`}
    >
      <button
        onClick={toggleFilter}
        className="btn-orange justify-start rounded-lg px-3 py-2 text-sm"
      >
        <Icon type="FilterMixer" size={24} className="mr-2" />
        <span>Filters</span>
      </button>
      <Search classes="order-first col-span-2 md:order-none md:col-span-1" />
      {/* <Sorter /> */}
    </div>
  );
}
