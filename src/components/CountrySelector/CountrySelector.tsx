import { Combobox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import {
  FieldValues,
  Path,
  get,
  useController,
  useFormContext,
} from "react-hook-form";
import { Country } from "types/components";
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
      aria-invalid={!!get(errors, `${props.fieldName}.name`)?.message}
      aria-disabled={props.disabled || isSubmitting}
      disabled={props.disabled || isSubmitting}
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
            props.onReset?.();
          }}
        >
          <Icon type="Close" size={16} />
        </button>
      )}

      <Options query={query} options={props.countries} />

      <ErrorMessage
        errors={errors}
        name={`${props.fieldName}.${nameKey}`}
        as="span"
        className={props.classes?.error}
      />
    </Combobox>
  );
}
