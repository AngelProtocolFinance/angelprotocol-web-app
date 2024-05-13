import { Combobox } from "@headlessui/react";
import { chains } from "constants/chains";
import { isEmpty } from "helpers";
import { useState } from "react";
import { useTokensQuery } from "services/apes";
import type { Token } from "types/aws";
import { type ChainID, chainIdIsNotSupported } from "types/chain";
import Icon from "../Icon";
import Image from "../Image";
import { ErrorStatus, LoadingStatus } from "../Status";

type Props = {
  selectedChainId: ChainID;
  classes?: string;
};

const container =
  "border border-gray-l4 p-1 max-h-60 w-max overflow-y-auto rounded-md bg-gray-l5 dark:bg-blue-d7 shadow-lg focus:outline-none";
export default function TokenOptions({ classes = "", selectedChainId }: Props) {
  const [searchText, setSearchText] = useState("");

  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useTokensQuery(selectedChainId, {
    skip: chainIdIsNotSupported(selectedChainId),
  });

  const nativeToken = chains[selectedChainId].nativeToken;
  const unsupportedToken: Token | undefined = chainIdIsNotSupported(
    selectedChainId
  )
    ? {
        ...nativeToken,
        approved: true,
        logo: nativeToken.logo ?? "",
        min_donation_amnt: 0,
        coingecko_denom: nativeToken.coinGeckoId,
        token_id: nativeToken.id,
        type: "evm-native",
      }
    : undefined;

  const tokens = unsupportedToken ? [unsupportedToken] : data;

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
              "flex items-center gap-2 p-3 hover:bg-blue-l4 dark:hover:bg-blue-d5 cursor-pointer"
            }
            value={{ ...token, amount: "0" }}
          >
            <Image src={token.logo} className="w-6 h-6" />
            <span className="text-sm">{token.symbol}</span>
          </Combobox.Option>
        ))
      )}
    </Combobox.Options>
  );
}
