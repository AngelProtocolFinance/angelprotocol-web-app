import { randomLaira } from "assets/laira/laira";
import Image from "components/Image";
import { Info, LoadingStatus } from "components/Status";
import { appRoutes } from "constants/routes";
import { categories } from "constants/unsdgs";
import { Link, useFetcher } from "react-router-dom";
import type { EndowCardsPage } from "types/aws";
import { TopCountries } from "./TopCountries";

interface Props {
  query: string;
  initPage: EndowCardsPage;
  classes?: string;
}

export default function SearchDropdown({
  classes = "",
  initPage,
  query,
}: Props) {
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
              <Link
                key={v.name}
                className="border border-gray-l4 px-6 py-2 rounded-full text-sm hover:bg-blue-l4"
                to={{
                  pathname: appRoutes.marketplace,
                  search: new URLSearchParams({
                    sdgs: v.sdgs.join(),
                  }).toString(),
                }}
              >
                {v.name}
              </Link>
            ))}
          </div>
          <h4 className="mb-4 mt-8">Top countries</h4>
          <TopCountries />

          <Link
            className="text-blue-d1 font-medium text-lg text-center mt-8 block"
            to={appRoutes.marketplace}
          >
            Explore all Causes
          </Link>
        </>
      ) : (
        <SearchResult
          {...(data || initPage)}
          isLoading={state !== "idle"}
          query={query}
        />
      )}
    </div>
  );
}

interface ISearchResult extends EndowCardsPage {
  isLoading: boolean;
  query: string;
}
function SearchResult(props: ISearchResult) {
  if (props.isLoading) return <LoadingStatus>Searching...</LoadingStatus>;
  if (props.items.length === 0) return <Info>No organizations found.</Info>;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {props.items.map((endow) => (
        <Link
          to={`${appRoutes.marketplace}/${endow.id}`}
          key={endow.id}
          className="flex items-center gap-4 border border-gray-l4 hover:bg-blue-l4 pr-6 rounded-full overflow-clip h-10"
        >
          {endow.card_img ? (
            <Image
              src={endow.card_img}
              className="h-full aspect-video object-cover"
            />
          ) : (
            <div className="p-1.5 pr-0 h-full">
              <img src={randomLaira()} className="h-full object-contain" />
            </div>
          )}

          <span className="text-navy-l1">{endow.name}</span>
        </Link>
      ))}
      {props.page < props.numPages && (
        <Link
          className="w-full text-blue-d1 font-medium text-lg text-center mt-8 block"
          to={{
            pathname: appRoutes.marketplace,
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
