import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { Path, useController } from "react-hook-form";
import { Token } from "types/server/aws";
import { useChainWallet } from "contexts/ChainGuard";
import Icon from "./Icon";

type Base = { token: Token };
export default function TokenSelector<T extends Base>(props: {
  fieldName: Path<T>;
}) {
  const wallet = useChainWallet();
  const {
    field: { onChange: onTokenChange, value: token },
  } = useController<T>({ name: props.fieldName });

  const coins = [wallet.native_currency].concat(wallet.tokens);
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
      onChange={onTokenChange}
      as="div"
      className="relative flex items-center gap-1 w-full"
    >
      <img
        alt=""
        src={(token as Token).logo}
        className="w-6 h-6 object-contain "
      />
      <Combobox.Input
        disabled={coins.length <= 1}
        className="w-16 text-center text-sm focus:outline-none bg-transparent"
        displayValue={(coin: Token) => coin.symbol}
        onChange={(event) => setSymbol(event.target.value)}
      />

      {coins.length > 1 && (
        <Combobox.Button className="">
          {({ open }) => <Icon type={open ? "Down" : "CaretLeft"} />}
        </Combobox.Button>
      )}

      <Combobox.Options className="absolute top-0 right-0 mt-10 max-h-60 w-max overflow-auto rounded-md bg-zinc-50 shadow-lg focus:outline-none">
        {filteredCoins.length === 0 && symbol !== "" ? (
          <div className="relative cursor-default select-none py-2 px-4 text-zinc-700 text-sm">
            {symbol} not found
          </div>
        ) : (
          filteredCoins.map((coin) => (
            <Combobox.Option
              key={coin.token_id}
              className={
                "flex items-center gap-2 p-3 hover:bg-sky-500/10 cursor-pointer"
              }
              value={coin}
            >
              {({ selected }) =>
                !selected ? (
                  <>
                    <img
                      alt=""
                      src={coin.logo}
                      className="w-5 h-5 object-contain"
                    />
                    <span className={`text-sm text-zinc-600`}>
                      {coin.symbol}
                    </span>
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
