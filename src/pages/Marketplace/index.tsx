import banner from "assets/images/hero.png";
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
    <div className="w-full grid content-start bg-gray-l5 dark:bg-blue-d5 pb-16">
      <div
        style={{ backgroundImage: `url('${banner}')` }}
        className="relative overlay bg-cover bg-center"
      >
        <Banner classes="hidden lg:grid isolate" />
        <MobileBanner classes="grid lg:hidden isolate" />
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
          classes={`${
            isFilterOpen ? "col-span-2 md:col-span-1" : "col-span-2"
          }`}
        />
      </div>
    </div>
  );
}
