import { useLocation } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import { NavDropdown, UserMenu } from "components/header";
import { DappLogo } from "components/image";
import { authRoutes } from "constants/routes";
import { useRootData } from "hooks/use-root-data";
import { useState } from "react";
import type { EndowCardsPage } from "types/npo";
import SearchDropdown from "./search-dropdown";
import SearchField from "./search-field";

type Props = { classes?: string };

export default function Header({ classes }: Props) {
  const user = useRootData();
  const firstPage = useCachedLoaderData() as EndowCardsPage;
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
      <div className="grid relative items-center grid-cols-2 gap-4 xl:container xl:mx-auto px-5 bg-white rounded-full py-2">
        <DappLogo classes="w-48 h-12" />
        <SearchField
          onChange={(txt) => setQuery(txt)}
          classes="max-md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <div className="flex gap-2 md:gap-4 justify-self-end items-center">
          <UserMenu classes="max-sm:hidden" />
          <NavDropdown isInAuth={isInAuth} user={user} />
        </div>
      </div>
      <SearchDropdown
        initPage={firstPage}
        query={query}
        classes="mt-4 hidden group-has-[input:focus]:block hover:block absolute left-1/2 -translate-x-1/2"
      />
    </header>
  );
}
