import {
  useGetWallet,
  useSetWallet,
} from "contexts/WalletContext/WalletContext";
import { NativeTokenWithBalance } from "contexts/WalletContext/types";
import toCurrency from "helpers/toCurrency";

export default function Holdings(props: { coins: NativeTokenWithBalance[] }) {
  const { chainId } = useGetWallet();
  const { networkSwitcher } = useSetWallet();

  return (
    <ul className="p-4">
      {props.coins.map((coin) => {
        const isActiveNetwork = chainId !== coin.chainId;
        return (
          <li
            key={coin.symbol}
            className={`pt-3 grid grid-cols-aa1 items-center ${
              !isActiveNetwork ? "border-b border-angel-grey/10 pb-1" : ""
            }`}
          >
            <img
              src={coin.logo}
              className="w-7 h-7 object-contain mr-2"
              alt=""
            />
            <span className="uppercase text-sm font-bold mr-2 text-angel-grey">
              {coin.symbol}
            </span>
            <span className="ml-auto text-angel-grey">
              {toCurrency(+coin.balance, 3, true)}
            </span>
            {isActiveNetwork && (
              <button
                onClick={networkSwitcher(coin)}
                className="uppercase text-2xs font-bold font-heading text-angel-blue hover:text-bright-blue active:text-angel-orange col-start-1 col-span-3 border-t border-angel-grey/10 text-right mt-1 pt-1"
              >
                switch to network
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
