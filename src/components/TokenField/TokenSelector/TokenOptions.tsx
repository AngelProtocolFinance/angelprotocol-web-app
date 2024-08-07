import {
  CloseButton,
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  PopoverPanel,
} from "@headlessui/react";
import { skipToken } from "@reduxjs/toolkit/query";
import tokenLogoPlaceholder from "assets/icons/token-placeholder.svg";
import { chains } from "constants/chains";
import Fuse from "fuse.js";
import { isEmpty } from "helpers";
import useDebouncer from "hooks/useDebouncer";
import { useMemo, useState } from "react";
import { useTokensQuery } from "services/apes";
import {
  useLazyTokenDetailsQuery,
  useLazyUsdRateQuery,
} from "services/coingecko";
import type { Token } from "types/aws";
import type { ChainID } from "types/chain";
import type { TokenWithAmount } from "types/tx";
import Icon from "../../Icon";
import Image from "../../Image";
import { ErrorStatus, LoadingStatus } from "../../Status";
import type { OnTokenChange } from "./types";

type BasicToken = Pick<
  Token,
  "name" | "symbol" | "token_id" | "type" | "coingecko_denom"
>;
type MixedToken = BasicToken | Token;

type Props = {
  selectedChainId: ChainID | "";
  onChange: OnTokenChange;
  token: MixedToken;
  classes?: string;
};

const isApToken = (
  token: TokenWithAmount | BasicToken
): token is TokenWithAmount => "min_donation_amnt" in token;

const container =
  "w-56 border border-gray-l4 p-1 [--anchor-max-height:15rem] overflow-y-auto rounded-md bg-gray-l5 dark:bg-blue-d7 shadow-lg focus:outline-none";
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
  } = useTokensQuery(selectedChainId || skipToken);

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
        apTokens={tokens}
        coingeckoPlatformId={chains[selectedChainId].coingeckoPlatformId}
        onChange={onChange}
      />
    </PopoverPanel>
  );
}

interface ITokenCombobox extends Pick<Props, "onChange" | "token"> {
  apTokens: Token[];
  coingeckoPlatformId: string | null;
}
function TokenCombobox({
  token,
  apTokens,
  onChange,
  coingeckoPlatformId,
}: ITokenCombobox) {
  const [getToken] = useLazyTokenDetailsQuery();
  const [getUsdRate] = useLazyUsdRateQuery();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebouncer(searchText, 500);

  //biome-ignore lint: coinGeckoPlatformId is the only thing changing
  const [fuse, subset] = useMemo(() => {
    const coinGeckoTokens: any[] = coingeckoPlatformId
      ? require(`./coins/${coingeckoPlatformId}.json`)
      : [];

    const allTokens: MixedToken[] = coingeckoPlatformId
      ? apTokens.concat(coinGeckoTokens)
      : apTokens;

    const fuse = new Fuse<MixedToken>(allTokens, { keys: ["name", "symbol"] });
    return [fuse, allTokens.slice(0, 10)];
  }, [coingeckoPlatformId]);

  //biome-ignore lint: debounced search text is the only thing changing
  const searchResult = useMemo(() => {
    if (!debouncedSearchText) return subset;
    return fuse
      .search(debouncedSearchText, { limit: 10 })
      .map(({ item }) => item);
  }, [debouncedSearchText]);

  return (
    <Combobox
      by="token_id"
      value={token}
      virtual={{ options: searchResult }}
      onChange={async (tkn) => {
        if (!tkn) return;
        if (isApToken(tkn)) return onChange({ ...tkn, amount: "" });

        // basic token woudn't be included in list if no platform id
        if (!coingeckoPlatformId) return;

        const details = await getToken(tkn.coingecko_denom).unwrap();
        const usdRate = await getUsdRate(tkn.coingecko_denom).unwrap();

        onChange({
          ...tkn,
          min_donation_amnt: Math.ceil(25 / usdRate),
          approved: true,
          logo: details.image.thumb,
          decimals: details.detail_platforms[coingeckoPlatformId].decimal_place,
          amount: "",
        });
      }}
    >
      <div className="grid grid-cols-[1fr_auto] p-2 gap-2 rounded mb-1 border border-gray-l4">
        <ComboboxInput
          value={searchText}
          placeholder="Search..."
          className="text-left text-sm focus:outline-none bg-transparent"
          onChange={(event) => setSearchText(event.target.value)}
        />
        <Icon type="Search" size={20} />
      </div>

      {isEmpty(searchResult) && searchText !== "" ? (
        <div className="relative cursor-default select-none py-2 px-4 text-sm">
          {searchText} not found
        </div>
      ) : (
        <ComboboxOptions className="py-1 w-full" static>
          {({ option }) => {
            const token = option as MixedToken;
            return (
              <ComboboxOption
                as={CloseButton}
                key={token.token_id + token.type}
                className={
                  "w-full grid grid-cols-[auto_1fr] justify-items-start items-center gap-x-2 p-2 hover:bg-[--accent-secondary] data-[selected]:bg-[--accent-secondary] cursor-pointer"
                }
                value={{ ...token, amount: "" }}
              >
                <Image
                  src={"logo" in token ? token.logo : tokenLogoPlaceholder}
                  className="w-6 h-6 rounded-full row-span-2"
                />
                <span className="text-sm">{token.symbol}</span>
                <p className="text-xs text-gray col-start-2">{token.name}</p>
              </ComboboxOption>
            );
          }}
        </ComboboxOptions>
      )}
    </Combobox>
  );
}
