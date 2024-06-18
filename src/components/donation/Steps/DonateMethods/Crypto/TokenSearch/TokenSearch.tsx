import { Combobox } from "@headlessui/react";
import { Label } from "components/form";
import { unpack } from "helpers";
import { useState } from "react";
import type { TokenWithAmount } from "types/tx";
import Options from "./Options";

type Classes = {
  combobox?: string;
  label?: string;
  container?: string;
  options?: string;
};

type Props = {
  classes?: Classes;
  disabled?: boolean;
  required?: boolean;
  coinGeckoPlatformId: string;
  value: TokenWithAmount;
  onChange: (token: TokenWithAmount) => void;
};

export default function TokenSearch(props: Props) {
  const [query, setQuery] = useState("");

  const style = unpack(props.classes);

  return (
    <div className={`field ${style.container}`}>
      <Label
        htmlFor="wise__currency"
        className={style.label}
        required={props.required}
        aria-required={props.required}
      >
        Search token
      </Label>
      <Combobox
        disabled={props.disabled}
        by="token_id"
        value={props.value}
        onChange={props.onChange}
        as="div"
        className={`relative items-center grid grid-cols-[1fr_auto] field-container ${style.combobox}`}
      >
        <Combobox.Input
          id="wise__currency"
          className="w-full border-r border-gray-l3 dark:border-navy px-4 py-3.5 text-sm leading-5 focus:ring-0"
          displayValue={(token: TokenWithAmount) => token.symbol}
          onChange={(event) => setQuery(event.target.value)}
          spellCheck={false}
        />

        <Options
          searchText={query}
          classes={`col-span-full mt-2 ${style.options}`}
          platFormId={props.coinGeckoPlatformId}
        />
      </Combobox>
    </div>
  );
}
