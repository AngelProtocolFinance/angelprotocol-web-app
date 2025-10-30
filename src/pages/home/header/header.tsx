import {
  AuthBtns,
  AuthLinks,
  NavDropdown,
  // UserAvatar,
} from "components/header";
import { DappLogo } from "components/image";
import { auth_routes } from "constants/routes";
import { use_root_data } from "hooks/use-root-data";
// import { useState } from "react";
import { useLocation } from "react-router";
import type { EndowCardsPage } from "types/npo";
// import SearchDropdown from "./search-dropdown";
// import SearchField from "./search-field";

interface Props {
  classes?: string;
  page1: EndowCardsPage;
}

export function Header({ classes }: Props) {
  const user = use_root_data();
  // const [query, setQuery] = useState("");
  const { pathname: p, search: s } = useLocation();
  const to = auth_routes.includes(p) ? undefined : p + s;

  return (
    <header
      className={`${classes} group`}
      ref={(node) => {
        if (!node) return;
        const observer = new IntersectionObserver(
          ([e]) => {
            const isIntersecting = e.intersectionRatio < 1;
            e.target.classList.toggle("bg-white", isIntersecting);
            e.target.classList.toggle("shadow-lg", isIntersecting);
            e.target.classList.toggle("px-4", !isIntersecting);
          },
          { threshold: [1] }
        );
        observer.observe(node);
      }}
    >
      <div className="flex items-center gap-4 xl:container xl:mx-auto px-5 bg-white rounded-full py-2">
        <div className="flex-1">
          <DappLogo classes="h-12" />
        </div>
        {/* <SearchField
          onChange={(txt) => setQuery(txt)}
          classes="max-md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        /> */}
        {to && !user && <AuthBtns to={to} classes="max-sm:hidden flex-none" />}
        <NavDropdown
          user={user}
          auth_links={
            to && !user && <AuthLinks to={to} classes="sm:hidden flex-none" />
          }
        />
      </div>
      {/* <SearchDropdown
        page1={page1}
        query={query}
        classes="mt-4 hidden group-has-[input:focus]:block hover:block absolute left-1/2 -translate-x-1/2"
      /> */}
    </header>
  );
}
