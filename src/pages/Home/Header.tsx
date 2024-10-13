import {
  NavDropdown,
  SearchDropdown,
  SearchField,
  UserMenu,
} from "components/Header";
import { DappLogo } from "components/Image";
import { authRoutes } from "constants/routes";
import { useState } from "react";
import { useLocation, useRouteLoaderData } from "react-router-dom";
import type { UserV2 } from "types/auth";

type Props = { classes?: string };

export default function Header({ classes }: Props) {
  const user = useRouteLoaderData("root") as UserV2 | null;
  const location = useLocation();
  const [query, setQuery] = useState("");
  const isInAuth = authRoutes.includes(location.pathname);

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
        <SearchField
          classes="max-md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          text={query}
          onChange={(text) => setQuery(text)}
        />
        <div className="flex gap-2 md:gap-4 justify-self-end items-center">
          {!isInAuth && <UserMenu />}
          <NavDropdown isInAuth={isInAuth} user={user} />
        </div>
      </div>
      <SearchDropdown
        query={query}
        classes="mt-4 hidden group-has-[input:focus]:block hover:block absolute left-1/2 -translate-x-1/2"
      />
    </header>
  );
}
