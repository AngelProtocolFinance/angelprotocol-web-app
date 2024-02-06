import { ChainID } from "types/chain";
import { DisconnectedWallet } from "types/wallet";
import Wallet from "./Wallet";

type Props = {
  chainID: ChainID;
  wallets: DisconnectedWallet[];
};
export default function WalletSelection({ wallets, chainID }: Props) {
  return (
    <div className="">
      <p className="">Select a wallet to continue:</p>
      <div className="grid gap-y-2 mt-2">
        {wallets
          .filter((w) => w.supportedChains.includes(chainID))
          .map((w) => (
            <Wallet key={w.name} {...w} />
          ))}
      </div>
    </div>
  );
}
