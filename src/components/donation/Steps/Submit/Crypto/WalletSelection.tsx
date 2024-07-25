import type { DisconnectedWallet } from "types/wallet";
import Wallet from "./Wallet";

type Props = {
  wallets: DisconnectedWallet[];
  classes?: string;
};
export default function WalletSelection({ wallets, classes = "" }: Props) {
  return (
    <div className={`grid gap-y-2 ${classes}`}>
      {wallets.map((w) => (
        <Wallet key={w.name} {...w} />
      ))}
    </div>
  );
}
