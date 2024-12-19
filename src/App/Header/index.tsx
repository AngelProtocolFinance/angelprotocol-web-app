import { DappLogo } from "components/Image";
import { appRoutes } from "constants/routes";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import type { Link as TLink } from "../types";
import NavDropdown from "./NavDropdown";
import SearchDropdown from "./SearchDropdown";
import SearchField from "./SearchField";
import UserMenu from "./UserMenu";

type Props = { links: TLink[]; classes?: string };

export default function Header({ links, classes }: Props) {
  const location = useLocation();
  const [query, setQuery] = useState("");

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
      <div className="grid relative items-center grid-cols-2 gap-4 padded-container bg-white rounded-full py-2">
        <DappLogo classes="w-48 h-12" />
        {location.pathname === appRoutes.home && (
          <SearchField
            classes="max-md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            text={query}
            onChange={(text) => setQuery(text)}
          />
        )}
        <div className="flex gap-2 md:gap-4 justify-self-end items-center">
          {!(
            location.pathname === appRoutes.signin ||
            location.pathname === appRoutes.signup ||
            location.pathname === appRoutes.reset_password ||
            location.pathname === appRoutes.auth_redirector ||
            location.pathname === appRoutes.us_nonprofits
          ) && <UserMenu />}
          {location.pathname !== appRoutes.us_nonprofits && (
            <NavDropdown links={links} />
          )}
        </div>
      </div>
      {location.pathname === appRoutes.home && (
        <SearchDropdown
          query={query}
          classes="mt-4 hidden group-has-[input:focus]:block hover:block absolute left-1/2 -translate-x-1/2"
        />
      )}
    </header>
  );
}
