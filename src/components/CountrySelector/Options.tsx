import { Combobox } from "@headlessui/react";
import React from "react";
import { Country } from "types/countries";
import countries from "assets/countries/all.json";

const containerStyle =
  "absolute top-full mt-2 z-10 w-full bg-white dark:bg-blue-d3 shadow-lg rounded overflow-y-scroll scroller";

const options: Country[] = countries;
export default function Options({ query }: { query: string }) {
  const filtered = options.filter((o) =>
    o.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
  return (
    <Combobox.Options
      className={containerStyle}
      style={{ height: countries.length <= 10 ? "auto" : "10rem" }}
    >
      {(countries.length > 0 &&
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
                } flex items-center gap-2 p-2 text-sm`}
              >
                <span className="text-2xl">{country.flag}</span>
                <span>{country.name}</span>
              </li>
            )}
          </Combobox.Option>
        ))) || <div className="p-2 text-sm">{query} not found</div>}
    </Combobox.Options>
  );
}
