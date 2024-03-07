import { Combobox } from "@headlessui/react";
import { isEmpty } from "helpers";
import React from "react";
import { Country } from "types/components";

const containerStyle =
  "absolute top-full mt-2 z-10 w-full bg-white dark:bg-blue-d6 shadow-lg rounded overflow-y-scroll scroller";

type Props = {
  query: string;
  options: Country[];
};

export default function Options({ query, options }: Props) {
  const filtered = options.filter((o) =>
    o.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
  return (
    <Combobox.Options
      className={containerStyle}
      style={{ height: options.length <= 10 ? "auto" : "10rem" }}
    >
      {(!isEmpty(options) &&
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
                } flex items-center gap-2 p-2 text-sm font-heading`}
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
