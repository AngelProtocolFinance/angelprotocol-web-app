import QueryLoader from "@/components/QueryLoader";
import { useCountriesQuery } from "@ap/services/countries";
import { Combobox } from "@headlessui/react";
import React from "react";

const containerStyle =
  "absolute top-full mt-2 z-10 w-full bg-white dark:bg-blue-d6 shadow-lg rounded overflow-y-scroll scroller";

export default function Options({ query }: { query: string }) {
  const queryState = useCountriesQuery({});
  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "loading options..",
        error: "failed to get country options",
        empty: query ? `${query} not found` : "no options found",
      }}
      filterFn={(c) =>
        c.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      }
      classes={{ container: containerStyle + " p-2" }}
    >
      {(countries) => (
        <Combobox.Options
          className={containerStyle}
          style={{ height: countries.length <= 10 ? "auto" : "10rem" }}
        >
          {(countries.length > 0 &&
            countries.map((country) => (
              <Combobox.Option
                as={React.Fragment}
                key={country.name}
                value={country}
              >
                {({ active }) => (
                  <li
                    className={`${
                      active ? "bg-blue-l2 dark:bg-blue-d1" : ""
                    } flex gap-2 p-2 text-sm`}
                  >
                    <img
                      loading="lazy"
                      src={country.flag}
                      alt="flag"
                      className="aspect-video w-8 object-contain"
                    />
                    <span>{country.name}</span>
                  </li>
                )}
              </Combobox.Option>
            ))) || <div className="p-2 text-sm">{query} not found</div>}
        </Combobox.Options>
      )}
    </QueryLoader>
  );
}
