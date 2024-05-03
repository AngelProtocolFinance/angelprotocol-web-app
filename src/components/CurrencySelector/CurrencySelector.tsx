import { Combobox } from "@headlessui/react";
import Icon from "components/Icon/Icon";
import { useState } from "react";
import type { CurrencyOption } from "types/components";
import { type QueryState, isQuery } from "types/third-party/redux";
import { DrawerIcon } from "../Icon";
import { Label } from "../form";
import { unpack } from "../form/helpers";
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
    <div className={`field ${style.container}`}>
      <Label
        htmlFor="wise__currency"
        className={style.label}
        required={props.required}
        aria-required={props.required}
      >
        {props.label}
      </Label>
      <Combobox
        disabled={props.disabled || isCurrencyLoading || isCurrencyError}
        by={"code" as any}
        value={props.value}
        onChange={props.onChange}
        as="div"
        className={`relative items-center grid grid-cols-[1fr_auto] field-container ${style.combobox}`}
      >
        <Combobox.Input
          id="wise__currency"
          className="w-full border-r border-gray-l3 dark:border-navy px-4 py-3.5 text-sm leading-5 focus:ring-0"
          displayValue={(currency: T) =>
            !!currency.name
              ? `${currency.code.toUpperCase()} - ${currency.name}`
              : currency.code.toUpperCase()
          }
          onChange={(event) => setQuery(event.target.value)}
          spellCheck={false}
        />
        <Combobox.Button className="flex items-center px-2">
          {({ open }) =>
            isCurrencyLoading ? (
              <Icon
                type="Loading"
                className="text-navy-l2 animate-spin"
                size={20}
              />
            ) : (
              <DrawerIcon
                isOpen={open}
                size={25}
                className={`h-full w-full ${isCurrencyError ? "text-red" : ""}`}
                aria-hidden
              />
            )
          }
        </Combobox.Button>

        <CurrencyOptions
          query={query}
          classes={`absolute top-full mt-2 z-10 ${style.options}`}
          currencies={currencies}
        />
      </Combobox>
    </div>
  );
}
