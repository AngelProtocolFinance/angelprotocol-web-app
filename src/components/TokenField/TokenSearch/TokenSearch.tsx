import { Combobox } from "@headlessui/react";
import Modal from "components/Modal";
import { useState } from "react";
import { Label } from "../../form";
import Options from "./Options";
import type { CoinGeckoToken } from "./types";

type Props = {
  coingeckoPlatformId: string;
  onSubmit: (token: CoinGeckoToken) => void;
};

const initToken: CoinGeckoToken = {
  id: "",
  name: "",
  symbol: "",
  platforms: {},
};

export default function TokenSearch(props: Props) {
  const [query, setQuery] = useState("");
  const [token, setToken] = useState(initToken);

  return (
    <Modal className="field fixed-center z-10">
      <Label htmlFor="coingecko-search-text">Search token</Label>
      <Combobox
        by="id"
        value={token}
        onChange={(val) => setToken(val)}
        as="div"
        className="relative items-center grid grid-cols-[1fr_auto] field-container"
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
          classes="col-span-full"
          platFormId={props.coingeckoPlatformId}
        />
      </Combobox>
    </Modal>
  );
}
