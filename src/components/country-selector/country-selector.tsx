import { Combobox, ComboboxButton, ComboboxInput } from "@headlessui/react";
import { unpack } from "helpers";
import { X } from "lucide-react";
import { forwardRef, useState } from "react";
import {
  type FieldValues,
  type Path,
  get,
  useController,
  useFormContext,
} from "react-hook-form";
import type { Country } from "types/components";
import { DrawerIcon } from "../Icon";
import { placeHolderCountryOption } from "./constants";
import Options from "./options";

type El = HTMLInputElement;

interface BaseProps {
  options: Country[];
  onReset?: () => void;
  disabled?: boolean;
  placeholder?: string;
  classes?: {
    container?: string;
    input?: string;
    error?: string;
  };
}
interface Props extends BaseProps {
  value: Country;
  onChange: (country: Country) => void;
  error?: string;
}

export const ControlledCountrySelector = forwardRef<El, Props>((props, ref) => {
  const cls = unpack(props.classes);
  const [query, setQuery] = useState(props.value.name);
  return (
    <Combobox
      disabled={props.disabled}
      value={props.value}
      onChange={(c) => c && props.onChange(c)}
      as="div"
      className={`relative items-center grid grid-cols-[auto_auto_1fr] w-full field-container ${
        props.classes?.container || ""
      }`}
    >
      <span className="mr-1 empty:hidden text-3xl relative -bottom-0.5">
        {props.value.flag || null}
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

      {props.value.name /** not placeholder */ && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 transform text-red hover:text-red-l1 active:text-red-d1 "
          onClick={() => {
            props.onChange(placeHolderCountryOption);
            setQuery("");
            props.onReset?.();
          }}
        >
          <X size={16} />
        </button>
      )}

      <Options query={query} options={props.options} />

      {props.error && (
        <span data-error className={cls.error + " empty:hidden"}>
          {props.error}
        </span>
      )}
    </Combobox>
  );
});

type BaseFormShape = { [index: string]: Country };
const nameKey: keyof Country = "name";
export default function CountrySelector<
  T extends FieldValues,
  K extends Path<T>,
>({
  fieldName,
  disabled,
  ...props
}: BaseProps & { fieldName: T[K] extends Country ? K : never }) {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<BaseFormShape>();

  const {
    field: { value: country, onChange: onCountryChange, ref },
  } = useController<Record<string, Country>>({
    name: fieldName,
  });

  return (
    <ControlledCountrySelector
      value={country}
      onChange={onCountryChange}
      disabled={disabled || isSubmitting}
      ref={ref}
      error={get(errors, `${fieldName}.${nameKey}`)?.message}
      {...props}
    />
  );
}
