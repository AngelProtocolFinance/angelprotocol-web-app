import { NavLink } from "@remix-run/react";
import { apes } from "api/api";
import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { appRoutes } from "constants/routes";
import useSWR from "swr/immutable";

const fetcher = (path: string) => apes.get<string[]>(path).json();

export function TopCountries() {
  const { data, isLoading, error, isValidating } = useSWR(
    "top-countries",
    fetcher
  );
  return (
    <div className="flex flex-wrap gap-2">
      <QueryLoader
        queryState={{
          data,
          isLoading,
          isError: !!error,
          isFetching: isValidating,
        }}
        classes={{ container: "flex flex-wrap gap-2" }}
        messages={{
          loading: (
            <>
              {Array(10)
                .fill(0)
                .map((_, idx) => (
                  <ContentLoader key={idx} className="w-32 h-10 rounded-full" />
                ))}
            </>
          ),
        }}
      >
        {(countries) => (
          <>
            {countries.map((country) => (
              <NavLink
                key={country}
                className="[&:is(.pending)]:text-gray [&:is(.pending)]:pointer-events-none border border-gray-l4 px-6 py-2 rounded-full text-sm hover:bg-blue-l4"
                to={{
                  pathname: appRoutes.marketplace,
                  search: new URLSearchParams({
                    countries: country,
                  }).toString(),
                }}
              >
                {country}
              </NavLink>
            ))}
          </>
        )}
      </QueryLoader>
    </div>
  );
}
