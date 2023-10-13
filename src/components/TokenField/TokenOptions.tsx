import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { useTokensQuery } from "services/apes";
import Icon from "../Icon";
import Image from "../Image";
import QueryLoader from "../QueryLoader";

type Props = {
  address: string;
  chainId: string;
  classes?: string;
};

const container =
  "border border-prim p-1 max-h-60 w-max overflow-y-auto rounded-md bg-gray-l5 dark:bg-blue-d7 shadow-lg focus:outline-none";
export default function TokenOptions({ classes = "", ...props }: Props) {
  const [searchText, setSearchText] = useState("");
  const query = useTokensQuery(props);

  return (
    <QueryLoader
      queryState={query}
      messages={{ loading: "loading..", error: "failed to get tokens" }}
      classes={{ container: `${classes} ${container} text-sm` }}
    >
      {(tokens) => {
        const filtered =
          searchText === ""
            ? tokens
            : tokens.filter((t) => {
                return t.symbol.includes(searchText.toLowerCase());
              });

        return (
          <Combobox.Options className="absolute right-0 top-2 z-10 mt-10">
            <div className="flex p-2 gap-2 border border-prim rounded mb-1">
              <Icon type="Search" size={20} />
              <Combobox.Input
                placeholder="Search..."
                aria-disabled={tokens.length <= 1}
                className="text-left text-sm focus:outline-none bg-transparent w-20"
                onChange={(event) => setSearchText(event.target.value)}
              />
            </div>
            {filtered.length === 0 && searchText !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-sm">
                {searchText} not found
              </div>
            ) : (
              filtered.map((token) => (
                <Combobox.Option
                  key={token.token_id + token.type}
                  className={
                    "flex items-center gap-2 p-3 hover:bg-blue-l4 dark:hover:bg-blue-d5 cursor-pointer"
                  }
                  value={token}
                >
                  <Image src={token.logo} className="w-6 h-6" />
                  <span className="text-sm">{token.symbol}</span>
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        );
      }}
    </QueryLoader>
  );
}
