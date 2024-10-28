import { useModalContext } from "contexts/ModalContext";
import { FilterIcon } from "lucide-react";
import Filter from "../Filter";
import Search from "./Search";

// import Sorter from "./Sorter";

export default function Toolbar({ classes = "" }: { classes?: string }) {
  const { showModal } = useModalContext();
  return (
    <div
      className={`${classes} grid grid-cols-2 md:grid-cols-[auto_1fr] gap-3`}
    >
      <button
        onClick={() => showModal(Filter, {})}
        className="btn-blue justify-start justify-self-start rounded-lg px-3 py-2 text-sm"
      >
        <FilterIcon size={16} className="mr-2" />
        <span>Filters</span>
      </button>
      <Search classes="order-first col-span-2 md:order-none md:col-span-1" />
      {/* <Sorter /> */}
    </div>
  );
}
