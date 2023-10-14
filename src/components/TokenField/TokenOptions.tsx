import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { useTokensQuery } from "services/apes";
import Icon from "../Icon";
import Image from "../Image";

type Props = {
  userWalletAddress?: string;
  selectedChainId: string;
  classes?: string;
};

const container =
  "border border-prim p-1 max-h-60 w-max overflow-y-auto rounded-md bg-gray-l5 dark:bg-blue-d7 shadow-lg focus:outline-none";
export default function TokenOptions({
  classes = "",
  selectedChainId,
  userWalletAddress = "",
}: Props) {
  const [searchText, setSearchText] = useState("");
  const {
    data: tokens,
    isLoading,
    isError,
  } = useTokensQuery(
    {
      chainId: selectedChainId,
      address: userWalletAddress,
    },
    {
      selectFromResult({ data = [], ...rest }) {
        return {
          ...rest,
          data:
            searchText === ""
              ? data
              : data.filter((t) => {
                  return t.symbol.includes(searchText.toLowerCase());
                }),
        };
      },
    }
  );

  if (isLoading) {
    return (
      <Combobox.Options className={`${classes} ${container}`}>
        loading...
      </Combobox.Options>
    );
  }

  if (isError) {
    return (
      <Combobox.Options className={`${classes} ${container}`}>
        Failed to load tokens
      </Combobox.Options>
    );
  }

  return (
    <Combobox.Options className={`${classes} ${container}`}>
      <div className="flex p-2 gap-2 border border-prim rounded mb-1">
        <Icon type="Search" size={20} />
        <Combobox.Input
          placeholder="Search..."
          aria-disabled={tokens.length <= 1}
          className="text-left text-sm focus:outline-none bg-transparent w-20"
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>
      {tokens.length === 0 && searchText !== "" ? (
        <div className="relative cursor-default select-none py-2 px-4 text-sm">
          {searchText} not found
        </div>
      ) : (
        tokens.map((token) => (
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
