import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { FieldValues, Path, useController } from "react-hook-form";
import { Token } from "types/aws";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Icon, { DrawerIcon } from "./Icon";

export default function TokenSelector<T extends FieldValues>(props: {
  fieldName: Path<T>;
  classes?: { container?: string; options?: string };
}) {
  const { wallet } = useGetWallet();
  const {
    field: { onChange: onTokenChange, value: token },
  } = useController<T>({ name: props.fieldName });

  const coins = wallet?.coins || [];
  const [symbol, setSymbol] = useState("");

  const filteredCoins =
    symbol === ""
      ? coins
      : coins.filter((coin) => {
          return coin.symbol.includes(symbol.toLowerCase());
        });

  return (
    <Combobox
      value={token}
      onChange={(token: Token) => {
        onTokenChange({ ...token, amount: "" });
      }}
      as="div"
      className={`${
        props.classes?.container ?? ""
      } flex items-center gap-1 w-full dark:text-gray`}
    >
      <span className="text-sm">{token.symbol}</span>

      {coins.length > 1 && (
        <Combobox.Button className="">
          {({ open }) => <DrawerIcon isOpen={open} size={20} />}
        </Combobox.Button>
      )}

      <Combobox.Options
        className={`${
          props.classes?.options ?? ""
        } border border-gray-l2 dark:border-bluegray-d1 p-1 mt-10 max-h-60 w-max overflow-y-auto rounded-md bg-orange-l6 dark:bg-blue-d7 shadow-lg focus:outline-nones`}
      >
        <div className="flex p-2 gap-2 border border-gray-l2 dark:border-bluegray-d1 rounded mb-1">
          <Icon type="Search" size={20} />
          <Combobox.Input
            placeholder="Search..."
            disabled={coins.length <= 1}
            className="text-left text-sm focus:outline-none bg-transparent w-20"
            onChange={(event) => setSymbol(event.target.value)}
          />
        </div>
        {filteredCoins.length === 0 && symbol !== "" ? (
          <div className="relative cursor-default select-none py-2 px-4text-sm">
            {symbol} not found
          </div>
        ) : (
          filteredCoins.map((coin) => (
            <Combobox.Option
              key={coin.token_id}
              className={
                "flex items-center gap-2 p-3 hover:bg-blue-l4 dark:hover:bg-blue-d4 cursor-pointer"
              }
              value={coin}
            >
              {({ selected }) =>
                !selected ? (
                  <>
                    <img
                      alt=""
                      src={coin.logo}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="text-sm">{coin.symbol}</span>
                  </>
                ) : (
                  <></>
                )
              }
            </Combobox.Option>
          ))
        )}
      </Combobox.Options>
    </Combobox>
  );
}
