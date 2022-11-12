import { Combobox } from "@headlessui/react";
import React, { useMemo } from "react";
import { useCountriesQuery } from "services/countries";
import Icon from "components/Icon";

const containerStyle =
  "absolute top-full mt-2 z-10 w-full bg-white dark:bg-blue-d2 shadow-lg rounded overflow-y-scroll scroller";

export default function Options({ query }: { query: string }) {
  const { data: countries = [], isError, isLoading } = useCountriesQuery({});

  const filtered = useMemo(
    () =>
      query
        ? countries.filter((c) =>
            c.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          )
        : countries,
    [query, countries]
  );

  const numOptions = filtered.length;

  if (isLoading) {
    return (
      <div className={containerStyle + " flex items-center gap-2 p-2"}>
        <Icon type="Loading" className="animate-spin" />
        <p>Loading options</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={containerStyle + " flex items-center gap-2 p-2"}>
        <Icon type="Warning" className="text-red mr-2" size={20} />
        <p className="text-red text-sm">Failed to load country options</p>
      </div>
    );
  }

  return (
    <Combobox.Options
      className={containerStyle}
      style={{ height: numOptions <= 10 ? "auto" : "10rem" }}
    >
      {(numOptions > 0 &&
        filtered.map((country) => (
          <Combobox.Option
            as={React.Fragment}
            key={country.name}
            value={country}
          >
            {({ active }) => (
              <li
                className={`${
                  active ? "bg-blue-l2 dark:bg-blue-d1" : ""
                } flex gap-2 p-2`}
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
  );
}
