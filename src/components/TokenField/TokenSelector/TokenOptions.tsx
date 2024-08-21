import chains from "@better-giving/assets/chains.json";
import prod_tokens from "@better-giving/assets/tokens/prod.json";
import test_tokens from "@better-giving/assets/tokens/test.json";
import {
  CloseButton,
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  PopoverPanel,
} from "@headlessui/react";
import { logoUrl } from "constants/common";
import { IS_TEST } from "constants/env";
import Fuse from "fuse.js";
import { logger } from "helpers";
import { useMemo, useState } from "react";
import { useLazyMinAmountQuery } from "services/aws/crypto";
import type { TokenV2 } from "types/components";
import Icon from "../../Icon";
import Image from "../../Image";
import type { Token } from "../types";
import type { OnTokenChange } from "./types";

type Props = {
  onChange: OnTokenChange;
  token: TokenV2;
  classes?: string;
};
const container =
  "w-56 border border-gray-l4 p-1 [--anchor-max-height:15rem] overflow-y-auto rounded-md bg-gray-l5 dark:bg-blue-d7 shadow-lg focus:outline-none";
export default function TokenOptions({ onChange, token }: Props) {
  return (
    <PopoverPanel
      anchor={{ to: "bottom end", gap: 8, offset: 20 }}
      className={container}
    >
      <TokenCombobox token={token} onChange={onChange} />
    </PopoverPanel>
  );
}

interface ITokenCombobox extends Pick<Props, "onChange" | "token"> {}

const tokens = IS_TEST ? test_tokens : prod_tokens;
const tokensFuse = new Fuse<TokenV2>(tokens, {
  keys: ["name", "code", "network"],
});
const subset = tokens.slice(0, 10);
const tokenEv = (state: Token.State) => {
  document.dispatchEvent(
    new CustomEvent<Token.Event.Detail>(
      "crypto-token-event" satisfies Token.Event.Name,
      { bubbles: true, detail: { state } }
    )
  );
};

function TokenCombobox({ token, onChange }: ITokenCombobox) {
  const [searchText, setSearchText] = useState("");
  const [getMinAmount] = useLazyMinAmountQuery();

  const filtered = useMemo(
    () =>
      !searchText
        ? subset
        : tokensFuse.search(searchText, { limit: 10 }).map(({ item }) => item),
    [searchText]
  );

  return (
    <Combobox
      by="id"
      value={token}
      virtual={{ options: filtered }}
      onChange={async (tkn) => {
        if (!tkn) return;
        try {
          tokenEv("loading");
          const min = await getMinAmount(tkn.code).unwrap();
          // 3% allowance: min might change and be greater when estimate is made in server
          onChange({ ...tkn, amount: "", min: min * 1.03 });
          tokenEv("ok");
        } catch (err) {
          logger.error(err);
          tokenEv("error");
        }
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

      {filtered.length === 0 && searchText !== "" ? (
        <div className="relative cursor-default select-none py-2 px-4 text-sm">
          {searchText} not found
        </div>
      ) : (
        <ComboboxOptions className="py-1 w-full" static>
          {({ option }) => {
            const token = option as TokenV2;
            return (
              <ComboboxOption
                as={CloseButton}
                key={token.id}
                className={
                  "w-full grid grid-cols-[auto_1fr] justify-items-start items-center gap-x-2 p-2 hover:bg-[--accent-secondary] data-[selected]:bg-[--accent-secondary] cursor-pointer"
                }
                value={{ ...token, amount: "" }}
              >
                <Image
                  src={logoUrl(token.logo)}
                  className="w-6 h-6 rounded-full row-span-2"
                />

                <span className="text-sm">{token.code}</span>

                <p
                  style={{ color: token.color }}
                  className="text-xs col-start-2 text-left"
                >
                  {chains[token.network].name}
                </p>
              </ComboboxOption>
            );
          }}
        </ComboboxOptions>
      )}
    </Combobox>
  );
}
