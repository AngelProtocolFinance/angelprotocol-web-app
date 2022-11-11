import { Combobox } from "@headlessui/react";
import React, { useMemo, useState } from "react";
import { FieldValues, Path, useController } from "react-hook-form";
import { CountryOption } from "services/types";
import { useCountriesQuery } from "services/countries";
import Icon from "./Icon";

export const placeHolderCountryOption: CountryOption = { name: "", flag: "" };

export default function CountrySelector<
  T extends FieldValues,
  K extends Path<T>
>(props: {
  fieldName: T[K] extends CountryOption ? K : never;
  placeholder?: string;
  classes?: {
    container?: string;
    input?: string;
  };
}) {
  const {
    field: { value: country, onChange: onCountryChange },
  } = useController<{ [index: string]: CountryOption }>({
    name: props.fieldName,
  });

  const [query, setQuery] = useState(country.name);
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

  if (isLoading) {
    return <div>loading</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <Combobox
      value={country}
      onChange={onCountryChange}
      as="div"
      className={`relative w-full flex ${props.classes?.container || ""}`}
    >
      {country.name /** not placeholder */ && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 transform text-red hover:text-red-l1 active:text-red-d1 "
          onClick={() => {
            onCountryChange(placeHolderCountryOption);
          }}
        >
          <Icon type="Close" size={14} />
        </button>
      )}
      <img
        src={country.flag}
        alt="flag"
        className="aspect-video w-8 object-contain absolute left-2 top-1/2 -translate-y-1/2"
      />
      <Combobox.Input
        placeholder={props.placeholder}
        onChange={(event) => setQuery(event.target.value as any)}
        className={`focus:outline-none w-full ${props.classes?.input || ""}`}
      />

      <Combobox.Options className="absolute bottom-0 z-10 w-full bg-white shadow-lg rounded-md h-48 overflow-y-scroll scroller">
        {(filtered.length > 0 &&
          filtered.map((country) => (
            <Combobox.Option
              as={React.Fragment}
              key={country.name}
              value={country}
            >
              {({ active }) => (
                <li
                  className={`${
                    active ? "bg-blue-d4 text-white cursor-button" : ""
                  } flex gap-2 p-2 text-gray-d2`}
                >
                  <img
                    src={country.flag}
                    alt="flag"
                    className="aspect-video w-8 object-contain"
                  />
                  <span>{country.name}</span>
                </li>
              )}
            </Combobox.Option>
          ))) || (
          <div className="p-2 text-sm text-gray-d2">{query} not found</div>
        )}
      </Combobox.Options>
    </Combobox>
  );
}
