import { WalletState } from "contexts/WalletContext";
import Icon from "components/Icon";
import Balances from "./Balances";

export default function WalletDetails(props: WalletState) {
  return (
    <div className="grid gap-3 p-4 border-b border-gray-l2">
      <Balances coins={props.coins} />
      <div className="flex items-center gap-2 p-4 pl-3 bg-gray-l4 border border-gray-l2 rounded">
        <span className="font-body font-normal text-sm truncate">
          {props.address}
        </span>
        <Icon type="Copy" className="w-6 h-6" />
      </div>
    </div>
  );
}
