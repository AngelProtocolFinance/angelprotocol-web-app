import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { appRoutes } from "constants/routes";
import { toWithState } from "helpers/state-params";
import { Link } from "react-router-dom";
import { useTopCountriesQuery } from "services/apes";
import type { EndowFilterState } from "types/app";

export function TopCountries() {
  const query = useTopCountriesQuery({});
  return (
    <div className="flex flex-wrap gap-2">
      <QueryLoader
        queryState={query}
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
              <Link
                key={country}
                className="border border-gray-l4 px-6 py-2 rounded-full text-sm hover:bg-blue-l4"
                to={toWithState(appRoutes.marketplace, {
                  country,
                  searchText: "",
                } satisfies EndowFilterState)}
              >
                {country}
              </Link>
            ))}
          </>
        )}
      </QueryLoader>
    </div>
  );
}
