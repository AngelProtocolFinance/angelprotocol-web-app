import { Combobox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { CountryOption } from "services/types";
import ukflag from "assets/icons/uk-flag.png";
import unknownFlag from "assets/icons/unknown-flag.jpeg";
import { useLazyCountryFlagQuery } from "services/countries";
import Icon, { DrawerIcon } from "../Icon";
import Options from "./Options";

type BaseFormShape = { [index: string]: CountryOption };

export const placeHolderCountryOption: CountryOption = {
  name: "",
  flag: ukflag,
};

const containerStyle =
  "relative items-center grid grid-cols-[auto_auto_1fr] w-full";

const nameKey: keyof CountryOption = "name";

export default function CountrySelector<
  T extends FieldValues,
  K extends Path<T>
>(props: {
  fieldName: T[K] extends CountryOption ? K : never;
  placeholder?: string;
  classes?: {
    container?: string;
    input?: string;
    error?: string;
  };
}) {
  const {
    formState: { errors },
  } = useFormContext<BaseFormShape>();

  const {
    field: { value: country, onChange: onCountryChange },
  } = useController<BaseFormShape>({
    name: props.fieldName,
  });

  const [query, setQuery] = useState(country.name);
  const [queryFlag] = useLazyCountryFlagQuery();

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
    // eslint-disable-next-line
  }, []);

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

      <Options query={query} />

      <ErrorMessage
        errors={errors}
        name={`${props.fieldName}.${nameKey}`}
        as="span"
        className={props.classes?.error}
      />
    </Combobox>
  );
}
