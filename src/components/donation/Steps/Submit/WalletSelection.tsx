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
      <h3 className="relative rounded-t w-full pl-4 px-4 sm:px-0 py-4 sm:py-6 bg-orange-l6 border-b border-prim font-black sm:font-bold sm:text-center text-xl text-orange sm:text-inherit uppercase sm:capitalize dark:bg-blue-d7 ">
        Select wallet
      </h3>
      <div className="flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-8 dark:p-8 w-full sm:max-h-[492px] overflow-y-auto scroller">
        <p className="font-work sm:font-heading font-semibold sm:font-bold text-center text-base sm:text-lg">
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
