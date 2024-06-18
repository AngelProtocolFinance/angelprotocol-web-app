import { Combobox } from "@headlessui/react";
import { Label } from "components/form";
import { unpack } from "helpers";
import { useState } from "react";
import Options from "./Options";
import type { CoinGeckoToken } from "./types";

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
  value?: CoinGeckoToken;
  onChange: (token: CoinGeckoToken) => void;
};

const initToken: CoinGeckoToken = {
  id: "",
  name: "",
  symbol: "",
  platforms: {},
};

export default function TokenSearch(props: Props) {
  const [query, setQuery] = useState("");

  const style = unpack(props.classes);

  return (
    <div className={`field ${style.container}`}>
      <Label
        htmlFor="coingecko-search-text"
        className={style.label}
        required={props.required}
        aria-required={props.required}
      >
        Search token
      </Label>
      <Combobox
        disabled={props.disabled}
        by="id"
        value={props.value ?? initToken}
        onChange={props.onChange}
        as="div"
        className={`relative items-center grid grid-cols-[1fr_auto] field-container ${style.combobox}`}
      >
        <Combobox.Input
          placeholder="e.g. BTC"
          id="coingecko-search-text"
          className="w-full border-r border-gray-l3 dark:border-navy px-4 py-3.5 text-sm leading-5 focus:ring-0"
          displayValue={(token: CoinGeckoToken) => token.symbol}
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
