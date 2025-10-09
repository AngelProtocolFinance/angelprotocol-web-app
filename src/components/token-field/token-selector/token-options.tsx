import {
  type IToken,
  chains,
  is_custom,
  tokens_list,
} from "@better-giving/assets/tokens";
import type { NP } from "@better-giving/nowpayments/types";
import {
  CloseButton,
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  PopoverPanel,
} from "@headlessui/react";
import { logo_url } from "constants/common";
import Fuse from "fuse.js";
import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Image } from "../../image";
import type { Token } from "../types";
import type { OnTokenChange } from "./types";

type Props = {
  on_change: OnTokenChange;
  token: IToken;
  classes?: string;
  amnt: string;
};
const container =
  "w-56 border border-gray-l3 p-1 [--anchor-max-height:15rem] overflow-y-auto rounded-md bg-gray-l5 dark:bg-blue-d7 shadow-lg focus:outline-hidden";
export function TokenOptions({ on_change, token, amnt }: Props) {
  return (
    <PopoverPanel anchor={{ to: "bottom start", gap: 8 }} className={container}>
      <TokenCombobox token={token} on_change={on_change} amnt={amnt} />
    </PopoverPanel>
  );
}

interface ITokenCombobox extends Pick<Props, "on_change" | "token" | "amnt"> {}

const tokens_fuse = new Fuse<IToken>(tokens_list, {
  keys: ["name", "code", "network", "symbol"],
});
const subset = tokens_list.slice(0, 10);
const token_ev = (state: Token.State) => {
  document.dispatchEvent(
    new CustomEvent<Token.Event.Detail>(
      "crypto-token-event" satisfies Token.Event.Name,
      { bubbles: true, detail: { state } }
    )
  );
};

function TokenCombobox({ token, on_change, amnt }: ITokenCombobox) {
  const [search_txt, set_search_txt] = useState("");

  const filtered = useMemo(
    () =>
      !search_txt
        ? subset
        : tokens_fuse.search(search_txt, { limit: 10 }).map(({ item }) => item),
    [search_txt]
  );

  return (
    <Combobox
      by="id"
      value={token}
      virtual={{ options: filtered }}
      onChange={async (tkn) => {
        if (!tkn) return;
        try {
          token_ev("loading");

          if (is_custom(tkn.id)) {
            //get usd rate from coingecko
            const res = await fetch(
              `https://api.coingecko.com/api/v3/simple/price?ids=${tkn.cg_id}&vs_currencies=usd`
            );
            if (!res.ok) throw res;
            const {
              [tkn.cg_id]: { usd: rate },
            } = await res.json();
            on_change({ ...tkn, amount: amnt, min: 1 / rate, rate });
            return token_ev("ok");
          }

          const res = await fetch(
            `/api/nowpayments/v1/min-amount?currency_from=${tkn.code}&fiat_equivalent=usd`
          );
          if (!res.ok) throw res;
          const {
            min_amount: min,
            fiat_equivalent: min_usd,
          }: Required<NP.Estimate> = await res.json();

          const rate = min_usd / min;

          const BG_MIN = 1;
          const gtBgMin = min_usd >= BG_MIN ? min : BG_MIN / rate;
          // 3% allowance:
          // - 0.5% fee
          // - 2.5% spread in case server estimate is not the same
          const adjusted = gtBgMin * 1.03;

          on_change({ ...tkn, amount: amnt, min: adjusted, rate });
          token_ev("ok");
        } catch (err) {
          console.error(err);
          token_ev("error");
        }
      }}
    >
      <div className="grid grid-cols-[1fr_auto] p-2 gap-2 rounded-sm mb-1 border border-gray-l3">
        <ComboboxInput
          value={search_txt}
          placeholder="Search..."
          className="text-left text-sm focus:outline-hidden bg-transparent"
          onChange={(event) => set_search_txt(event.target.value)}
        />
        <SearchIcon size={20} />
      </div>

      {filtered.length === 0 && search_txt !== "" ? (
        <div className="relative cursor-default select-none py-2 px-4 text-sm">
          {search_txt} not found
        </div>
      ) : (
        <ComboboxOptions className="py-1 w-full" static>
          {({ option }) => {
            const token = option as IToken;
            return (
              <ComboboxOption
                as={CloseButton}
                key={token.id}
                className={
                  "w-full grid grid-cols-[auto_1fr] justify-items-start items-center gap-x-2 p-2 hover:bg-(--accent-secondary) data-selected:bg-(--accent-secondary) cursor-pointer"
                }
                value={{ ...token, amount: amnt }}
              >
                <Image
                  src={logo_url(token.logo, is_custom(token.id))}
                  className="w-6 h-6 rounded-full row-span-2"
                />

                <span className="text-sm">{token.symbol}</span>

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
