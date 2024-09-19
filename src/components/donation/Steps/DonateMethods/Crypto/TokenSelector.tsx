import chains from "@better-giving/assets/chains";
import prod_tokens from "@better-giving/assets/tokens";
import test_tokens from "@better-giving/assets/tokens/test";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from "@headlessui/react";
import { logoUrl } from "constants/common";
import { IS_TEST } from "constants/env";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import type { TokenV2 } from "types/components";

interface Props {
  token: TokenV2;
  onChange: (token: TokenV2) => void;
}

const tokens = IS_TEST ? test_tokens : prod_tokens;
const tokensFuse = new Fuse<TokenV2>(tokens, {
  keys: ["name", "code", "network", "symbol"],
});
const subset = tokens.slice(0, 10);

export function TokenSelector(props: Props) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      !search
        ? subset
        : tokensFuse.search(search, { limit: 10 }).map(({ item }) => item),
    [search]
  );
  return (
    <Field className="w-full grid">
      <Label className="block mb-2 red-asterisk font-semibold font-heading">
        Select token
      </Label>
      <Combobox
        by="id"
        immediate
        value={props.token}
        virtual={{ options: filtered }}
        onChange={(token) => token && props.onChange(token)}
        onClose={() => setSearch("")}
      >
        <ComboboxInput
          placeholder="Search"
          displayValue={(token?: TokenV2) => token?.symbol ?? ""}
          className="font-heading bg-transparent py-[13px] px-5 placeholder:text-navy-l3 text-navy-d4 border border-gray-l3 rounded-lg text-base font-semibold placeholder:font-medium outline-blue-d1 outline-offset-4"
          onChange={(event) => setSearch(event.target.value)}
        />

        {filtered.length === 0 && search !== "" ? (
          <div className="relative cursor-default select-none py-2 px-4 text-sm">
            {search} not found
          </div>
        ) : (
          <ComboboxOptions
            className="py-1 w-[var(--input-width)] bg-white h-80 drop-shadow-2xl rounded-lg"
            anchor={{ to: "bottom", gap: 8 }}
          >
            {({ option }) => {
              const token = option as TokenV2;
              return (
                <ComboboxOption
                  key={token.id}
                  className={
                    "w-full flex items-center gap-x-2 px-5 py-3 hover:bg-[--accent-secondary] data-[selected]:bg-[--accent-secondary] cursor-pointer"
                  }
                  value={token}
                >
                  <img
                    src={logoUrl(token.logo)}
                    className="w-6 h-6 rounded-full"
                  />

                  <span>{token.symbol}</span>

                  <p style={{ color: token.color }} className="text-sm">
                    {chains[token.network].name}
                  </p>
                </ComboboxOption>
              );
            }}
          </ComboboxOptions>
        )}
      </Combobox>
    </Field>
  );
}
