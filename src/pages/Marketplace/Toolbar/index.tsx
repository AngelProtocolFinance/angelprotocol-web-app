import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import FiltersModal from "../FiltersModal";
import Search from "./Search";

// import Sorter from "./Sorter";

export default function Toolbar({ classes = "" }: { classes?: string }) {
  const { showModal } = useModalContext();

  return (
    <div
      className={`${classes} grid grid-cols-2 md:grid-cols-[auto_1fr] gap-3`}
    >
      <button
        onClick={() => {
          showModal(FiltersModal, {});
        }}
        className="btn-orange rounded-lg w-40 h-10 px-3 py-2 text-sm"
      >
        <Icon type="Filter" size={24} className="mr-auto" />
        <span>Show Filters</span>
      </button>
      <Search classes="order-first col-span-2 md:order-none md:col-span-1" />
    </div>
  );
}
