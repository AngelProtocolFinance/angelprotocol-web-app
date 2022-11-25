import { WalletState } from "contexts/WalletContext";
import Copier from "components/Copier";
import Balances from "./Balances";
import ChainSelector from "./ChainSelector";

export default function WalletDetails(props: WalletState) {
  return (
    <div className="grid gap-3 p-4 border-b border-gray-l2 dark:border-bluegray">
      <Balances coins={props.coins} />
      <div className="flex items-center justify-between w-full gap-2 p-4 pl-3 bg-gray-l4 dark:bg-bluegray-d1 border border-gray-l2 dark:border-bluegray rounded">
        <span className="max-w-[75vw] sm:w-56 font-body font-normal text-sm truncate hover:cursor-default">
          {props.address}
        </span>
        <Copier text={props.address} classes="w-6 h-6 hover:text-orange" />
      </div>
      <ChainSelector {...props} />
    </div>
  );
}
