import { useGetter } from "store/accessors";
import Banner from "./Banner";
import Cards from "./Cards";
import MobileBanner from "./MobileBanner";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

export default function Marketplace() {
  const isFilterOpen = useGetter(
    (state) => state.component.marketFilter.isOpen
  );
  return (
    <>
      <div className="bg-market-banner-light dark:bg-market-banner-dark bg-cover bg-center">
        <Banner classes="hidden lg:grid" />
        <MobileBanner classes="grid lg:hidden" />
      </div>

      <div className="pt-4 pb-16 grid grid-cols-[auto_1fr] gap-4 grid-rows-[auto_1fr] padded-container min-h-screen text-gray-d2 bg-orange-l6 dark:bg-blue-d4">
        <Toolbar />
        <Sidebar
          classes={`${
            isFilterOpen
              ? "fixed z-20 inset-0 md:grid md:relative md:z-0"
              : "hidden"
          }`}
        />
        <Cards
          classes={`${
            isFilterOpen ? "col-span-2 md:col-span-1" : "col-span-2"
          }`}
        />
      </div>
    </>
  );
}
