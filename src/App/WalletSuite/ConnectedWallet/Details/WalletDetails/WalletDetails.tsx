import { WalletState } from "contexts/WalletContext";
import Address from "./Address";
import Balances from "./Balances";
import ChainSelector from "./ChainSelector";

export default function WalletDetails(props: WalletState) {
  return (
    <div className="grid gap-3 p-4 border-b border-gray-l2 dark:border-bluegray">
      <Balances coins={props.coins} giftcardCoins={props.giftcardCoins} />
      <Address value={props.address} />
      <ChainSelector {...props} />
    </div>
  );
}
