import Seo from "components/Seo";
import ModalContext from "contexts/ModalContext";
import { useLoaderData } from "react-router-dom";
import type { EndowFilterState } from "types/app";
import ActiveFilters from "./ActiveFilters";
import Cards from "./Cards";
import { Context, type State } from "./Context";
import Hero from "./Hero";
import Toolbar from "./Toolbar";

export { stateLoader as loader } from "helpers/state-params";

export function Component() {
  const state = useLoaderData() as undefined | EndowFilterState;
  const { searchText = "", sdgGroup, country } = state || {};
  const initState: Partial<State> = {
    searchText,
    sdgGroups: sdgGroup ? [sdgGroup] : [],
    countries: country ? [country] : [],
  };

  return (
    <div className="w-full grid content-start pb-16">
      <Seo title="Marketplace" />
      <div className="relative overlay bg-cover bg-left-top">
        <Hero classes="grid isolate mt-28 mb-16" />
      </div>

      <div className="grid gap-y-4 content-start padded-container min-h-screen">
        <Context init={initState}>
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
