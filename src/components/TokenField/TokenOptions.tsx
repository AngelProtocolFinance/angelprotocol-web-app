import {
  CloseButton,
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  PopoverPanel,
} from "@headlessui/react";
import { skipToken } from "@reduxjs/toolkit/query";
import { chains, juno, kujira, stargaze, terraMainnet } from "constants/chains";
import { useModalContext } from "contexts/ModalContext";
import { isEmpty } from "helpers";
import { useState } from "react";
import { useTokensQuery } from "services/apes";
import type { Token } from "types/aws";
import type { ChainID } from "types/chain";
import type { TokenWithAmount } from "types/tx";
import Icon from "../Icon";
import Image from "../Image";
import { ErrorStatus, LoadingStatus } from "../Status";
import TokenSearch from "./TokenSearch";

type Props = {
  selectedChainId: ChainID | "";
  onChange: (token: TokenWithAmount) => void;
  token: TokenWithAmount;
  classes?: string;
};

const container =
  "w-56 border border-gray-l4 p-1 [--anchor-max-height:13rem] overflow-y-auto rounded-md bg-gray-l5 dark:bg-blue-d7 shadow-lg focus:outline-none";
export default function TokenOptions({
  selectedChainId,
  onChange,
  token,
}: Props) {
  const {
    data: tokens = [],
    isLoading,
    isFetching,
    isError,
  } = useTokensQuery(!selectedChainId ? skipToken : selectedChainId);

  if (!selectedChainId) {
    return (
      <PopoverPanel anchor="bottom end" className={container}>
        <ErrorStatus classes="text-sm p-2">No network selected</ErrorStatus>
      </PopoverPanel>
    );
  }

  if (isLoading || isFetching) {
    return (
      <PopoverPanel anchor="bottom end" className={container}>
        <LoadingStatus classes="text-sm text-navy-d4 dark:text-navy-l2 p-2">
          Loading..
        </LoadingStatus>
      </PopoverPanel>
    );
  }

  if (isError) {
    return (
      <PopoverPanel anchor="bottom end" className={container}>
        <ErrorStatus classes="text-sm p-2">Failed to load tokens</ErrorStatus>
      </PopoverPanel>
    );
  }

  return (
    <PopoverPanel
      anchor={{ to: "bottom end", gap: 8, offset: 20 }}
      className={container}
    >
      <TokenCombobox
        token={token}
        tokens={tokens}
        coingeckoPlatformId={chains[selectedChainId].coingeckoPlatformId}
        onChange={onChange}
      />
    </PopoverPanel>
  );
}

interface ITokenCombobox extends Pick<Props, "onChange" | "token"> {
  tokens: Token[];
  coingeckoPlatformId: string | null;
}
function TokenCombobox({
  token,
  tokens,
  coingeckoPlatformId,
  onChange,
}: ITokenCombobox) {
  const { showModal } = useModalContext();
  const [searchText, setSearchText] = useState("");
  const searchResult =
    searchText === ""
      ? tokens
      : tokens.filter((t) => {
          return t.symbol.toLowerCase().includes(searchText.toLowerCase());
        });

  return (
    <Combobox value={token} onChange={onChange}>
      <div className="grid grid-cols-[1fr_auto] p-2 gap-2 rounded mb-1 border border-gray-l4">
        <ComboboxInput
          value={searchText}
          placeholder="Search..."
          aria-disabled={tokens.length < 1}
          className="text-left text-sm focus:outline-none bg-transparent w-20"
          onChange={(event) => setSearchText(event.target.value)}
        />
        <Icon type="Search" size={20} />
      </div>
      {isEmpty(searchResult) && searchText !== "" ? (
        <div className="relative cursor-default select-none py-2 px-4 text-sm">
          {searchText} not found
        </div>
      ) : (
        <ComboboxOptions static>
          {searchResult.map((token) => (
            <CloseButton
              as={ComboboxOption}
              key={token.token_id + token.type}
              className={
                "flex items-center gap-2 p-3 hover:bg-[--accent-secondary] cursor-pointer"
              }
              value={{ ...token, amount: "0" }}
            >
              <Image src={token.logo} className="w-6 h-6" />
              <span className="text-sm">{token.symbol}</span>
            </CloseButton>
          ))}
        </ComboboxOptions>
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
    </Combobox>
  );
}
