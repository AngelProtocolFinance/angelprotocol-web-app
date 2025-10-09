import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  Field,
  Label,
} from "@headlessui/react";
import { unpack } from "helpers/unpack";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import {
  type CurrencyOption,
  type QueryState,
  is_query,
} from "types/components";
import { DrawerIcon } from "../icon";
import { CurrencyOptions } from "./currency-options";

type Classes = {
  combobox?: string;
  label?: string;
  container?: string;
  options?: string;
  input?: string;
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

export function CurrencySelector<T extends CurrencyOption>({
  currencies,
  ...props
}: Props<T>) {
  const [query, set_query] = useState("");

  const is_currency_loading = is_query(currencies) && currencies.is_loading;
  const is_currency_error = is_query(currencies) && currencies.is_error;

  const style = unpack(props.classes);

  return (
    <Field
      disabled={props.disabled || is_currency_loading || is_currency_error}
      className={style.container}
    >
      <Label
        className={`${style.label} label mb-2`}
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
        className={`relative ${style.combobox}`}
      >
        <ComboboxInput
          className={`h-full field-input ${style.input}`}
          displayValue={(currency: T) =>
            "name" in currency
              ? `${currency.code.toUpperCase()} - ${currency.name}`
              : currency.code.toUpperCase()
          }
          onChange={(event) => set_query(event.target.value)}
          spellCheck={false}
        />
        <ComboboxButton className="flex items-center absolute inset-y-0 right-4">
          {({ open }) =>
            is_currency_loading ? (
              <LoaderCircle className="text-gray animate-spin" size={20} />
            ) : (
              <DrawerIcon
                is_open={open}
                size={20}
                className={`${is_currency_error ? "text-red" : ""}`}
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
