import org_building from "assets/icons/org-building.svg";
import { Image } from "components/image";
import { Info, LoadingStatus } from "components/status";
import { categories } from "constants/unsdgs";
import { Link, NavLink, href, useFetcher } from "react-router";
import type { EndowCardsPage } from "types/npo";
import { TopCountries } from "./top-countries";

interface Props {
  query: string;
  page1: EndowCardsPage;
  classes?: string;
}

export default function SearchDropdown({ classes = "", page1, query }: Props) {
  const { data, state } = useFetcher<EndowCardsPage>({ key: "home" });

  return (
    <div
      className={`${classes} bg-white container rounded-lg p-6 shadow-2xl shadow-black/20`}
    >
      {state === "idle" && !query ? (
        <>
          <h4 className="mb-4">Top categories</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categories).map(([, v]) => (
              <NavLink
                key={v.name}
                className="[&:is(.pending)]:text-gray [&:is(.pending)]:pointer-events-none border border-gray-l3 px-6 py-2 rounded-full text-sm hover:bg-blue-l4"
                to={{
                  pathname: href("/marketplace"),
                  search: new URLSearchParams({
                    sdgs: v.sdgs.join(),
                  }).toString(),
                }}
              >
                {v.name}
              </NavLink>
            ))}
          </div>
          <h4 className="mb-4 mt-8">Top countries</h4>
          <TopCountries />

          <NavLink
            className="text-blue-d1 [&:is(.pending)]:text-gray font-medium text-lg text-center mt-8 block"
            to={href("/marketplace")}
          >
            Explore all Causes
          </NavLink>
        </>
      ) : (
        <SearchResult
          {...(data || page1)}
          is_loading={state !== "idle"}
          query={query}
        />
      )}
    </div>
  );
}

interface ISearchResult extends EndowCardsPage {
  is_loading: boolean;
  query: string;
}
function SearchResult(props: ISearchResult) {
  if (props.is_loading) return <LoadingStatus>Searching...</LoadingStatus>;
  if (props.items.length === 0) return <Info>No organizations found.</Info>;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {props.items.map((endow) => (
        <Link
          to={href("/marketplace/:id", { id: endow.id.toString() })}
          key={endow.id}
          className="flex items-center gap-x-1 group/item"
        >
          {endow.card_img ? (
            <Image
              width={26}
              src={endow.card_img}
              className="aspect-square object-cover rounded-full"
            />
          ) : (
            <img
              width={35}
              src={org_building}
              alt="small house with triangle roof"
              className="aspect-square object-cover grayscale-100 group-hover/item:grayscale-0"
            />
          )}

          <span className="text-gray  group-hover/item:text-blue">
            {endow.name}
          </span>
        </Link>
      ))}
      {props.page < props.pages && (
        <Link
          className="w-full text-blue-d1 font-medium text-lg text-center mt-8 block"
          to={{
            pathname: href("/marketplace"),
            search: new URLSearchParams({
              query: props.query,
            }).toString(),
          }}
        >
          View all results
        </Link>
      )}
    </div>
  );
}
