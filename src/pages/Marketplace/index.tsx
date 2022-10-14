import { useEndowmentsQuery } from "services/juno/account";
import { useGetter } from "store/accessors";
import Cards from "./Cards";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

export default function Marketplace() {
  const isFilterOpen = useGetter(
    (state) => state.component.marketFilter.isOpen
  );
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 grid-rows-[auto_1fr] padded-container pb-16 pt-4 min-h-screen text-gray-d2">
      <Toolbar />
      <Sidebar
        classes={`${
          isFilterOpen
            ? "fixed z-20 inset-0 lg:grid lg:relative lg:z-0"
            : "hidden"
        }`}
      />
      <Cards
        classes={`${isFilterOpen ? "col-span-2 lg:col-span-1" : "col-span-2"}`}
      />
    </div>
  );
}
