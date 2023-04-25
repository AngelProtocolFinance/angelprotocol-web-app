import { Combobox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import {
  FieldValues,
  Path,
  get,
  useController,
  useFormContext,
} from "react-hook-form";
import { Country } from "types/countries";
import countries from "assets/countries/all.json";
import Icon, { DrawerIcon } from "../Icon";
import Options from "./Options";

type BaseFormShape = { [index: string]: Country };

export const placeHolderCountryOption: Country = {
  name: "",
  flag: "",
  code: "",
};

const nameKey: keyof Country = "name";

export default function CountrySelector<
  T extends FieldValues,
  K extends Path<T>
>(props: {
  fieldName: T[K] extends Country ? K : never;
  onReset?(): void;
  placeholder?: string;
  classes?: {
    container?: string;
    input?: string;
    error?: string;
  };
}) {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<BaseFormShape>();

  const {
    field: { value: country, onChange: onCountryChange, ref },
  } = useController<BaseFormShape>({
    name: props.fieldName,
  });

  const [query, setQuery] = useState(country.name);

  /**
   * some consumers can only store countryName:string
   * in this case, get flag for them when this component loads
   */
  useEffect(() => {
    (async () => {
      if (country.name && !country.flag) {
        const flag = countries.find((c) => c.name === country.name)?.flag || "";
        onCountryChange({ name: country.name, flag });
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <Combobox
      aria-invalid={!!get(errors, `${props.fieldName}.name`)?.message}
      aria-disabled={isSubmitting}
      value={country}
      onChange={onCountryChange}
      as="div"
      className={`relative items-center grid grid-cols-[auto_auto_1fr] w-full field-container ${
        props.classes?.container || ""
      }`}
    >
      <span className="mr-1 empty:hidden text-3xl relative -bottom-0.5">
        {country.flag || null}
      </span>

      <Combobox.Button>
        {({ open }) => <DrawerIcon isOpen={open} size={25} className="mr-1" />}
      </Combobox.Button>

      <Combobox.Input
        ref={ref}
        placeholder={props.placeholder}
        onChange={(event) => setQuery(event.target.value as any)}
        displayValue={(country: Country) => country.name}
        className={props.classes?.input}
      />

      {country.name /** not placeholder */ && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 transform text-red hover:text-red-l1 active:text-red-d1 "
          onClick={() => {
            onCountryChange(placeHolderCountryOption);
            setQuery("");
            props.onReset && props.onReset();
          }}
        >
          <Icon type="Close" size={16} />
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
