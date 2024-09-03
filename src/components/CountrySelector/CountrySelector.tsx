import { Combobox, ComboboxButton, ComboboxInput } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import {
  type FieldValues,
  type Path,
  useController,
  useFormContext,
} from "react-hook-form";
import type { Country } from "types/components";
import Icon, { DrawerIcon } from "../Icon";
import Options from "./Options";
import { placeHolderCountryOption } from "./constants";

type BaseFormShape = { [index: string]: Country };

const nameKey: keyof Country = "name";

export default function CountrySelector<
  T extends FieldValues,
  K extends Path<T>,
>(props: {
  countries: Country[];
  disabled?: boolean;
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
  } = useController<Record<string, Country>>({
    name: props.fieldName,
  });

  const [query, setQuery] = useState(country.name);

  return (
    <Combobox
      disabled={props.disabled || isSubmitting}
      value={country}
      onChange={(c) => c && onCountryChange(c)}
      as="div"
      className={`relative items-center grid grid-cols-[auto_auto_1fr] w-full field-container ${
        props.classes?.container || ""
      }`}
    >
      <span className="mr-1 empty:hidden text-3xl relative -bottom-0.5">
        {country.flag || null}
      </span>

      <ComboboxButton>
        {({ open }) => <DrawerIcon isOpen={open} size={20} className="mr-1" />}
      </ComboboxButton>

      <ComboboxInput
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

      <Options query={query} options={props.countries} />

      <ErrorMessage
        data-error
        errors={errors}
        name={`${props.fieldName}.${nameKey}`}
        as="span"
        className={props.classes?.error}
      />
    </Combobox>
  );
}
