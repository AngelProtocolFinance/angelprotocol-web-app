import { Combobox } from "@headlessui/react";
import Modal from "components/Modal";
import { useModalContext } from "contexts/ModalContext";
import { logger } from "helpers";
import { useState } from "react";
import { useLazyTokenDetailsQuery } from "services/coingecko";
import { Label } from "../../form";
import Options from "./Options";
import type { CoinGeckoToken } from "./types";

type Details = {
  decimals: number;
  address: string;
  logo: string;
};
type Props = {
  coingeckoPlatformId: string;
  onSubmit: (token: CoinGeckoToken, details: Details) => void;
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
  const [getToken, { isLoading, isError, isFetching }] =
    useLazyTokenDetailsQuery();
  const { closeModal } = useModalContext();
  const isGettingTokenDetails = isLoading || isFetching;
  const submitDisabled = isGettingTokenDetails || token.id === initToken.id;

  return (
    <Modal className="grid field fixed-center z-10 bg-white p-4 rounded">
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
          displayValue={(token: CoinGeckoToken) => token.symbol.toUpperCase()}
          onChange={(event) => setQuery(event.target.value)}
          spellCheck={false}
        />

        <Options
          searchText={query}
          classes="col-span-full"
          platFormId={props.coingeckoPlatformId}
        />
      </Combobox>
      <button
        onClick={async () => {
          try {
            const details = await getToken(token.id).unwrap();
            const info = details.detail_platforms[props.coingeckoPlatformId];

            props.onSubmit(token, {
              decimals: info.decimal_place,
              address: info.contract_address,
              logo: details.image.thumb,
            });
            closeModal();
          } catch (err) {
            logger.error(err);
          }
        }}
        type="button"
        disabled={submitDisabled}
        className="btn-blue px-4 py-2 text-xs mt-4 justify-self-end"
      >
        {isGettingTokenDetails ? "Setting.." : "Proceed"}
      </button>
      {isError && <span className="text-xs text-red">failed to set token</span>}
    </Modal>
  );
}
