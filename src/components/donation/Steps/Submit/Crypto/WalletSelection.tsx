import { ChainID } from "types/chain";
import { DisconnectedWallet } from "types/wallet";
import Wallet from "./Wallet";

type Props = {
  chainID: ChainID;
  wallets: DisconnectedWallet[];
};
export default function WalletSelection({ wallets, chainID }: Props) {
  return (
    <div className="grid sm:items-center w-full max-w-lg  text-gray-d2  dark:text-white">
      <div className="flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-8 dark:p-8 w-full sm:max-h-[492px] overflow-y-auto scroller">
        <p className="sm:font-heading font-semibold sm:font-bold text-center text-base sm:text-lg">
          Select one of the available wallets to continue
        </p>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {wallets
            .filter((w) => w.supportedChains.includes(chainID))
            .map((w) => (
              <Wallet key={w.name} {...w} />
            ))}
        </div>
      </div>
    </div>
  );
}
