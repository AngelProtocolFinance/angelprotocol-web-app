import { Combobox } from "@headlessui/react";
import React, { useEffect, useMemo, useState } from "react";
import { FieldValues, Path, useController } from "react-hook-form";
import { CountryOption } from "services/types";
import ukflag from "assets/icons/uk-flag.png";
import unknownFlag from "assets/icons/unknown-flag.jpeg";
import { useCountriesQuery, useLazyCountryFlagQuery } from "services/countries";
import Icon, { DrawerIcon } from "./Icon";

export const placeHolderCountryOption: CountryOption = {
  name: "",
  flag: ukflag,
};

const containerStyle =
  "relative items-center grid grid-cols-[auto_auto_1fr] w-full";

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
  const [queryFlag] = useLazyCountryFlagQuery();

  const filtered = useMemo(
    () =>
      query
        ? countries.filter((c) =>
            c.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          )
        : countries,
    [query, countries]
  );

  /**
   * some consumers can only store countryName:string
   * in this case, get flag for them when this component loads
   */
  useEffect(() => {
    (async () => {
      if (country.name && !country.flag) {
        const { data = "" } = await queryFlag(country.name);
        onCountryChange({ name: country.name, flag: data });
      }
    })();
  }, []);

  if (isLoading) {
    return <Skeleton classes={props.classes?.container} />;
  }

  if (isError) {
    return <Skeleton classes={props.classes?.container} error />;
  }

  const numOptions = filtered.length;

  return (
    <Combobox
      value={country}
      onChange={onCountryChange}
      as="div"
      className={`${containerStyle} ${props.classes?.container || ""}`}
    >
      <img
        src={country.flag}
        alt="flag"
        className="w-8"
        onError={(e) => {
          e.currentTarget.src = unknownFlag;
        }}
      />

      <Combobox.Button>
        {({ open }) => <DrawerIcon isOpen={open} size={25} className="mx-1" />}
      </Combobox.Button>

      <Combobox.Input
        placeholder={props.placeholder}
        onChange={(event) => setQuery(event.target.value as any)}
        displayValue={(country: CountryOption) => country.name}
        className={`focus:outline-none w-full ${props.classes?.input || ""}`}
      />

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

      <Combobox.Options
        className="absolute top-full mt-2 z-10 w-full bg-white dark:bg-blue-d2 shadow-lg rounded overflow-y-scroll scroller"
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
    </Combobox>
  );
}

function Skeleton({ classes = "", error }: { classes?: string; error?: true }) {
  return (
    <div className={containerStyle + ` ${classes} h-[3.25rem] px-4 py-3.5`}>
      {error ? (
        <>
          <Icon type="Warning" className="text-red mr-2" size={20} />
          <p className="text-red text-sm">Failed to load country options</p>
        </>
      ) : (
        <>
          <Icon type="Loading" className="animate-spin" />
        </>
      )}
    </div>
  );
}
