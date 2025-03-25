import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  Field,
  Label,
} from "@headlessui/react";
import { unpack } from "helpers/unpack";
import { X } from "lucide-react";
import { type ReactNode, forwardRef, useState } from "react";
import {
  type FieldValues,
  type Path,
  get,
  useController,
  useFormContext,
} from "react-hook-form";
import type { Country } from "types/components";
import { DrawerIcon } from "../icon";
import { placeHolderCountryOption } from "./constants";
import Options from "./options";

type El = HTMLInputElement;

interface BaseProps {
  options: Country[];
  onReset?: () => void;
  required?: boolean;
  label?: ReactNode;
  disabled?: boolean;
  placeholder?: string;
  classes?: {
    container?: string;
    input?: string;
    error?: string;
    label?: string;
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
    <Field className={`w-full ${cls.container} grid content-start`}>
      <Label
        data-required={props.required}
        className={`${cls.label} label empty:hidden mb-2`}
      >
        {props.label}
      </Label>
      <Combobox
        disabled={props.disabled}
        value={props.value}
        onChange={(c) => c && props.onChange(c)}
        as="div"
        className="relative"
      >
        <ComboboxButton className="absolute left-4 top-1/2 -translate-y-1/2">
          {({ open }) =>
            props.value.flag ? (
              <span className="text-2xl">{props.value.flag}</span>
            ) : (
              <DrawerIcon isOpen={open} size={20} />
            )
          }
        </ComboboxButton>

        <ComboboxInput
          ref={ref}
          placeholder={props.placeholder}
          onChange={(event) => setQuery(event.target.value as any)}
          displayValue={(country: Country) => country.name}
          className={
            props.classes?.input +
            ` field-input w-full h-full ${props.value.flag ? "pl-12" : "pl-12"}`
          }
        />

        {props.value.name /** not placeholder */ && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 transform text-red hover:text-red-l1 active:text-red-d1 "
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
      </Combobox>
      <span className={cls.error + " empty:hidden field-err mt-1"}>
        {props.error}
      </span>
    </Field>
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
