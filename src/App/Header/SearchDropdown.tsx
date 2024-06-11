import Image from "components/Image";
import QueryLoader from "components/QueryLoader";
import { appRoutes } from "constants/routes";
import { categories } from "constants/unsdgs";
import useDebouncer from "hooks/useDebouncer";
import { Link } from "react-router-dom";
import { useEndowmentCardsQuery } from "services/aws/aws";

interface Props {
  query: string;
  classes?: string;
}

export default function SearchDropdown({ classes = "", query }: Props) {
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
            <div className="flex flex-wrap items-center gap-4">
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
              {hasMoreItems && (
                <Link
                  className="w-full text-blue-d1 font-medium text-lg text-center mt-8 block"
                  to={appRoutes.marketplace}
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
