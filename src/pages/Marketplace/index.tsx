import ModalContext from "contexts/ModalContext";
import ActiveFilters from "./ActiveFilters";
import Cards from "./Cards";
import { Context } from "./Context";
import Hero from "./Hero";
import Toolbar from "./Toolbar";

export default function Marketplace() {
  return (
    <div className="w-full grid content-start pb-16">
      <div className="relative overlay bg-cover bg-left-top">
        <Hero classes="grid isolate mt-28 mb-16" />
      </div>

      <div className="grid gap-y-4 content-start padded-container min-h-screen">
        <Context>
          <ModalContext>
            <Toolbar classes="mt-10" />
            <ActiveFilters />
            <Cards />
          </ModalContext>
        </Context>
      </div>
    </div>
  );
}
