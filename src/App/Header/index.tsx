import Icon from "components/Icon";
import Image, { DappLogo } from "components/Image";
import QueryLoader from "components/QueryLoader";
import { appRoutes } from "constants/routes";
import { categories } from "constants/unsdgs";
import useDebouncer from "hooks/useDebouncer";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEndowmentCardsQuery } from "services/aws/aws";
import type { Link as TLink } from "../types";
import NavDropdown from "./NavDropdown";
import UserMenu from "./UserMenu";

type Props = { links: TLink[]; classes?: string };

export default function Header({ links, classes }: Props) {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [debouncedQuery, isDebouncing] = useDebouncer(query, 500);

  const { currentData, isLoading, isFetching, isError, isUninitialized } =
    useEndowmentCardsQuery(
      {
        query: debouncedQuery,
        page: 1,
      },
      { skip: isDebouncing }
    );

  const isCategoriesShown =
    !query && !isDebouncing && !isLoading && !isFetching;

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
          <div className="max-md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center px-4 py-1 text-sm gap-1 font-heading">
            <label htmlFor="__endow-search">
              <Icon type="Search" className="mr-1 text-2xl text-gray" />
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              id="__endow-search"
              type="text"
              placeholder="Search causes..."
              className="focus:outline-none text-lg placeholder:text-gray text-navy-l1"
            />
          </div>
        )}
        <div className="flex gap-2 md:gap-4 justify-self-end items-center">
          {!(
            location.pathname === appRoutes.signin ||
            location.pathname === appRoutes.signup ||
            location.pathname === appRoutes.reset_password ||
            location.pathname === appRoutes.auth_redirector
          ) && <UserMenu />}
          <NavDropdown links={links} />
        </div>
      </div>
      {location.pathname === appRoutes.home && (
        <div className="absolute hidden group-has-[input:focus]:block hover:block bg-white mt-4 container left-1/2 -translate-x-1/2 rounded-lg p-10 shadow-2xl shadow-black/20">
          {isCategoriesShown ? (
            <>
              <h4 className="mb-4">Top categories</h4>
              <div className="flex flex-wrap gap-2">
                {Object.values(categories).map((v) => (
                  <Link
                    key={v.name}
                    className="border border-blue-d1 px-6 py-2 rounded-full text-sm"
                    to={appRoutes.marketplace}
                  >
                    {v.name}
                  </Link>
                ))}
              </div>
              <Link
                className="text-blue-d1 font-medium text-lg text-center mt-8 block"
                to={appRoutes.marketplace}
              >
                Explore all Categories
              </Link>
            </>
          ) : (
            <QueryLoader
              queryState={{
                data: currentData?.Items || [],
                isLoading: isLoading || isUninitialized,
                isFetching: isFetching || isUninitialized,
                isError,
              }}
              messages={{
                loading: "Searching...",
                fetching: "Searching...",
                empty: "No endowments found",
              }}
            >
              {(endows) => (
                <div className="flex items-center gap-4">
                  {endows.map((endow) => (
                    <Link
                      to={`${appRoutes.marketplace}/${endow.id}`}
                      key={endow.id}
                      className="flex items-center gap-4 border border-gray-l4 pr-6 rounded-full overflow-clip"
                    >
                      <Image
                        src={endow.card_img}
                        className="h-10 w-14 object-contain"
                      />
                      <span>{endow.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </QueryLoader>
          )}
        </div>
      )}
    </header>
  );
}
