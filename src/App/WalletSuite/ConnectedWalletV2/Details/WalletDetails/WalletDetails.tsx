import { WalletState } from "contexts/WalletContext";
import Balances from "./Balances";

export default function WalletDetails(props: WalletState) {
  return (
    <div className="grid gap-3 p-4 border-b border-gray-l2">
      <Balances coins={props.coins} />
    </div>
  );
}
