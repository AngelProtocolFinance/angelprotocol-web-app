import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { chains, juno, kujira, stargaze, terraMainnet } from "constants/chains";
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
  onChange: (token: TokenWithAmount) => void;
  classes?: string;
};

const container =
  "w-max border border-gray-l4 p-1 [--anchor-max-height:13rem] w-max overflow-y-auto rounded-md bg-gray-l5 dark:bg-blue-d7 shadow-lg focus:outline-none";
export default function TokenOptions({ selectedChainId, onChange }: Props) {
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
      <ComboboxOptions anchor="bottom" className={container}>
        <LoadingStatus classes="text-sm text-navy-d4 dark:text-navy-l2 p-2">
          Loading..
        </LoadingStatus>
      </ComboboxOptions>
    );
  }

  if (isError) {
    return (
      <ComboboxOptions anchor="bottom" className={container}>
        <ErrorStatus classes="text-sm p-2">Failed to load tokens</ErrorStatus>
      </ComboboxOptions>
    );
  }

  const coingeckoPlatformId = chains[selectedChainId].coingeckoPlatformId;

  return (
    <ComboboxOptions
      anchor={{ to: "bottom", gap: 10 }}
      className={`${container} scroller`}
    >
      <div className="flex p-2 gap-2 border border-gray-l4 rounded mb-1">
        <Icon type="Search" size={20} />
        <input
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
          <ComboboxOption
            key={token.token_id + token.type}
            className={
              "flex items-center gap-2 p-3 hover:bg-[--accent-secondary] cursor-pointer"
            }
            value={{ ...token, amount: "0" }}
          >
            <Image src={token.logo} className="w-6 h-6" />
            <span className="text-sm">{token.symbol}</span>
          </ComboboxOption>
        ))
      )}
      {coingeckoPlatformId && (
        <button
          onClick={() =>
            showModal(TokenSearch, {
              coingeckoPlatformId,
              onSubmit: (token, usdRate, details) => {
                const option: TokenWithAmount = {
                  approved: false,
                  decimals: details.decimals,
                  logo: details.logo,
                  min_donation_amnt: Math.ceil(25 / usdRate),
                  symbol: token.symbol.toUpperCase(),
                  token_id: details.address,
                  coingecko_denom: token.id,
                  type:
                    coingeckoPlatformId === juno.coingeckoPlatformId ||
                    coingeckoPlatformId === terraMainnet.coingeckoPlatformId ||
                    coingeckoPlatformId === stargaze.coingeckoPlatformId ||
                    coingeckoPlatformId === kujira.coingeckoPlatformId
                      ? "cw20"
                      : "erc20",
                  amount: "", //should reset previously selected amount
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
    </ComboboxOptions>
  );
}
