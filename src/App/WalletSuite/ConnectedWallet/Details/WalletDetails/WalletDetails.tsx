import { ConnectedWallet } from "contexts/WalletContext";
import Address from "./Address";
import Balances from "./Balances";
import ChainSelector from "./ChainSelector";

export default function WalletDetails(props: ConnectedWallet) {
  return (
    <div className="grid gap-3 p-4 border-b border-gray-l2 dark:border-bluegray">
      <Balances />
      <Address value={props.address} />
      <ChainSelector {...props} />
    </div>
  );
}
