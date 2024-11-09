import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  Field,
  Label,
} from "@headlessui/react";
import { unpack } from "helpers";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import {
  type CurrencyOption,
  type QueryState,
  isQuery,
} from "types/components";
import { DrawerIcon } from "../Icon";
import CurrencyOptions from "./CurrencyOptions";

type Classes = {
  combobox?: string;
  label?: string;
  container?: string;
  options?: string;
};

type Props<T extends CurrencyOption> = {
  classes?: Classes;
  currencies: T[] | QueryState<T[]>;
  disabled?: boolean;
  required?: boolean;
  value: T;
  label: string;
  onChange: (currency: T) => void;
};

export default function CurrencySelector<T extends CurrencyOption>({
  currencies,
  ...props
}: Props<T>) {
  const [query, setQuery] = useState("");

  const isCurrencyLoading = isQuery(currencies) && currencies.isLoading;
  const isCurrencyError = isQuery(currencies) && currencies.isError;

  const style = unpack(props.classes);

  return (
    <Field
      disabled={props.disabled || isCurrencyLoading || isCurrencyError}
      className={`field ${style.container}`}
    >
      <Label
        className={`${style.label} label`}
        data-required={props.required}
        aria-required={props.required}
      >
        {props.label}
      </Label>
      <Combobox
        by="code"
        value={props.value}
        onChange={(val) => val && props.onChange(val)}
        as="div"
        className={`relative items-center grid grid-cols-[1fr_auto] field-container ${style.combobox}`}
      >
        <ComboboxInput
          className="w-full dark:border-navy px-4 py-3.5 text-sm leading-5 focus:ring-0"
          displayValue={(currency: T) =>
            !!currency.name
              ? `${currency.code.toUpperCase()} - ${currency.name}`
              : currency.code.toUpperCase()
          }
          onChange={(event) => setQuery(event.target.value)}
          spellCheck={false}
        />
        <ComboboxButton className="flex items-center absolute inset-y-0 right-2">
          {({ open }) =>
            isCurrencyLoading ? (
              <LoaderCircle className="text-navy-l2 animate-spin" size={20} />
            ) : (
              <DrawerIcon
                isOpen={open}
                size={20}
                className={`${isCurrencyError ? "text-red" : ""}`}
                aria-hidden
              />
            )
          }
        </ComboboxButton>

        <CurrencyOptions
          query={query}
          classes={`absolute top-full mt-2 z-10 ${style.options}`}
          currencies={currencies}
        />
      </Combobox>
    </Field>
  );
}
