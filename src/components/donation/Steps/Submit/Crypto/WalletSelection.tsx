import type { ChainID } from "types/chain";
import type { DisconnectedWallet } from "types/wallet";
import Wallet from "./Wallet";

type Props = {
  chainID: ChainID;
  wallets: DisconnectedWallet[];
  classes?: string;
};
export default function WalletSelection({
  wallets,
  chainID,
  classes = "",
}: Props) {
  return (
    <div className={`grid gap-y-2 ${classes}`}>
      {wallets
        .filter((w) => w.supportedChains.includes(chainID))
        .map((w) => (
          <Wallet key={w.name} {...w} />
        ))}
    </div>
  );
}
