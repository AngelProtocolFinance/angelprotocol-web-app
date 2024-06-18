import { Combobox } from "@headlessui/react";
import { chains, juno, terraMainnet } from "constants/chains";
import { useModalContext } from "contexts/ModalContext";
import { isEmpty } from "helpers";
import { useState } from "react";
import { useTokensQuery } from "services/apes";
import type { ChainID } from "types/chain";
import type { TokenWithAmount } from "types/tx";
import Icon from "../Icon";
import Image from "../Image";
import { ErrorStatus, LoadingStatus } from "../Status";
import TokenSearch from "./TokenSearch";

type Props = {
  selectedChainId: ChainID;
  amount: string;
  onChange: (token: TokenWithAmount) => void;
  classes?: string;
};

const container =
  "border border-gray-l4 p-1 max-h-60 w-max overflow-y-auto rounded-md bg-gray-l5 dark:bg-blue-d7 shadow-lg focus:outline-none";
export default function TokenOptions({
  classes = "",
  selectedChainId,
  amount,
  onChange,
}: Props) {
  const [searchText, setSearchText] = useState("");

  const { showModal } = useModalContext();

  const {
    data: tokens = [],
    isLoading,
    isFetching,
    isError,
  } = useTokensQuery(selectedChainId);

  const searchResult =
    searchText === ""
      ? tokens
      : tokens.filter((t) => {
          return t.symbol.toLowerCase().includes(searchText.toLowerCase());
        });

  if (isLoading || isFetching) {
    return (
      <Combobox.Options className={`${classes} ${container}`}>
        <LoadingStatus classes="text-sm text-navy-d4 dark:text-navy-l2 p-2">
          Loading..
        </LoadingStatus>
      </Combobox.Options>
    );
  }

  if (isError) {
    return (
      <Combobox.Options className={`${classes} ${container}`}>
        <ErrorStatus classes="text-sm p-2">Failed to load tokens</ErrorStatus>
      </Combobox.Options>
    );
  }

  const coingeckoPlatformId = chains[selectedChainId].coingeckoPlatformId;

  return (
    <Combobox.Options className={`${classes} ${container}`}>
      <div className="flex p-2 gap-2 border border-gray-l4 rounded mb-1">
        <Icon type="Search" size={20} />
        <Combobox.Input
          placeholder="Search..."
          aria-disabled={tokens.length < 1}
          className="text-left text-sm focus:outline-none bg-transparent w-20"
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>
      {isEmpty(searchResult) && searchText !== "" ? (
        <div className="relative cursor-default select-none py-2 px-4 text-sm">
          {searchText} not found
        </div>
      ) : (
        searchResult.map((token) => (
          <Combobox.Option
            key={token.token_id + token.type}
            className={
              "flex items-center gap-2 p-3 hover:bg-[--accent-secondary] cursor-pointer"
            }
            value={{ ...token, amount: "0" }}
          >
            <Image src={token.logo} className="w-6 h-6" />
            <span className="text-sm">{token.symbol}</span>
          </Combobox.Option>
        ))
      )}
      {coingeckoPlatformId && (
        <button
          onClick={() =>
            showModal(TokenSearch, {
              coingeckoPlatformId,
              onSubmit: (token, details) => {
                const option: TokenWithAmount = {
                  approved: false,
                  decimals: details.decimals,
                  logo: details.logo,
                  min_donation_amnt: 0,
                  symbol: token.symbol.toUpperCase(),
                  token_id: details.address,
                  coingecko_denom: token.id,
                  type:
                    coingeckoPlatformId === juno.coingeckoPlatformId ||
                    coingeckoPlatformId === terraMainnet.coingeckoPlatformId
                      ? "cw20"
                      : "erc20",
                  amount,
                };
                onChange(option);
              },
            })
          }
          type="button"
          className="text-xs text-blue-d1 px-3 pb-1"
        >
          Not listed?
        </button>
      )}
    </Combobox.Options>
  );
}
