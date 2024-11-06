import { randomLaira } from "assets/laira/laira";
import Image from "components/Image";
import QueryLoader from "components/QueryLoader";
import { appRoutes } from "constants/routes";
import { categories } from "constants/unsdgs";
import useDebouncer from "hooks/useDebouncer";
import { Link } from "react-router-dom";
import { useEndowmentCardsQuery } from "services/aws/aws";
import type { EndowFilterState } from "types/app";
import type { SDGGroup } from "types/lists";
import { TopCountries } from "./TopCountries";

interface Props {
  query: string;
  classes?: string;
}

export default function SearchDropdown({ classes = "", query }: Props) {
  const [debouncedQuery, isDebouncing] = useDebouncer(query, 500);
  const { currentData, isLoading, isFetching, isError, isUninitialized } =
    /** @ts-ignore: temp */
    useEndowmentCardsQuery(
      {
        query: debouncedQuery,
        page: "1",
      },
      { skip: isDebouncing }
    );

  const isCategoriesShown =
    !debouncedQuery && !isDebouncing && !isLoading && !isFetching;

  const hasMoreItems = (currentData?.NumOfPages ?? 1) > 1;
  return (
    <div
      className={`${classes} bg-white container rounded-lg p-6 shadow-2xl shadow-black/20`}
    >
      {isCategoriesShown ? (
        <>
          <h4 className="mb-4">Top categories</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categories).map(([group, v]) => (
              <Link
                state={
                  {
                    sdgGroup: +group as SDGGroup,
                    searchText: "",
                  } satisfies EndowFilterState
                }
                key={v.name}
                className="border border-gray-l4 px-6 py-2 rounded-full text-sm hover:bg-blue-l4"
                to={appRoutes.marketplace}
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
            <div className="flex flex-wrap items-center gap-4">
              {endows.map((endow) => (
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
                      <img
                        src={randomLaira()}
                        className="h-full object-contain"
                      />
                    </div>
                  )}

                  <span className="text-navy-l1">{endow.name}</span>
                </Link>
              ))}
              {hasMoreItems && (
                <Link
                  className="w-full text-blue-d1 font-medium text-lg text-center mt-8 block"
                  to={appRoutes.marketplace}
                  state={
                    { searchText: debouncedQuery } satisfies EndowFilterState
                  }
                >
                  View all results
                </Link>
              )}
            </div>
          )}
        </QueryLoader>
      )}
    </div>
  );
}
