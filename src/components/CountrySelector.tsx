import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { FieldValues, Path, useController } from "react-hook-form";
import { useCountriesQuery } from "services/countries";
import useDebouncer from "hooks/useDebouncer";
import Icon from "./Icon";

export default function CountrySelector<T extends FieldValues>(props: {
  fieldName: Path<T>;
  classes?: {
    container?: string;
    input?: string;
  };
}) {
  const {
    field: { value: countryName, onChange: onCountryNameChange },
  } = useController<T>({
    name: props.fieldName,
  });

  const [query, setQuery] = useState(countryName);
  const [debouncedQuery, isDebouncing] = useDebouncer(query, 700);

  const {
    data: countries = [],
    isError,
    isLoading,
  } = useCountriesQuery(debouncedQuery || "", {
    skip: isDebouncing || !debouncedQuery,
  });

  const isSearching = isDebouncing || isLoading;

  return (
    <Combobox
      value={countryName}
      onChange={onCountryNameChange}
      as="div"
      className={`relative w-full ${props.classes?.container || ""}`}
    >
      <div className="absolute right-2 top-1/2 -translate-y-1/2 transform">
        {isSearching ? (
          <Icon type="Loading" className="animate-spin" />
        ) : countryName ? (
          <button
            className="text-red hover:text-red-l1 active:text-red-d1"
            onClick={() => {
              onCountryNameChange("");
            }}
          >
            <Icon type="Close" size={14} />
          </button>
        ) : (
          <Icon type="Search" />
        )}
      </div>
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value as any)}
        className={`focus:outline-none w-full ${props.classes?.input || ""}`}
      />
      {debouncedQuery && !isSearching && (
        /** user typed something and loaders are done */
        <Combobox.Options className="absolute z-10 w-full bg-white shadow-lg rounded-md">
          {(countries.length > 0 &&
            !isError &&
            countries.map((country) => (
              <Combobox.Option
                key={country.name}
                value={country.name}
                className="cursor-button flex gap-2 p-2 text-sm hover:bg-blue-l4/50 cursor-button text-gray-d2"
              >
                <img
                  src={country.flag}
                  alt="flag"
                  className="aspect-video w-8 object-contain"
                />
                <span>{country.name}</span>
              </Combobox.Option>
            ))) || (
            <div className="p-2 text-sm text-gray-d2">
              {debouncedQuery} not found
            </div>
          )}
        </Combobox.Options>
      )}
    </Combobox>
  );
}
