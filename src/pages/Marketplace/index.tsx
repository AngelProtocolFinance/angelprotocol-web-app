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

      <div className="grid grid-cols-[auto_1fr] gap-x-8 grid-rows-[auto_1fr] padded-container min-h-screen text-gray-d2">
        <Toolbar classes="my-10 col-span-2" />
        <Sidebar
          classes={`${
            isFilterOpen
              ? "fixed z-20 inset-0 md:grid md:relative md:z-0"
              : "hidden"
          }`}
        />
        <Cards
          classes={`mb-16 ${
            isFilterOpen ? "col-span-2 md:col-span-1" : "col-span-2"
          }`}
        />
      </div>
    </>
  );
}
