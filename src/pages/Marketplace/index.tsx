import banner from "assets/images/hero.png";
import { useGetter } from "store/accessors";
import Cards from "./Cards";
import Hero from "./Hero";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

export default function Marketplace() {
  const isFilterOpen = useGetter(
    (state) => state.component.marketFilter.isOpen
  );
  return (
    <div className="w-full grid content-start pb-16">
      <div
        style={{ backgroundImage: `url('${banner}')` }}
        className="relative overlay bg-cover bg-center"
      >
        <Hero classes="grid isolate mt-28 mb-16" />
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-8 grid-rows-[auto_1fr] padded-container min-h-screen">
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
