import { WalletProvider } from "@terra-money/wallet-provider";
import { DonaterConfigFromWidget } from "types/widget";
import WalletContext from "contexts/WalletContext";
import { chainOptions } from "constant/chainOptions";
import CurrentStep from "./CurrentStep";

type Props = {
  className?: string;
  donaterConfig: DonaterConfigFromWidget | null;
};

export function Steps({ className = "", donaterConfig }: Props) {
  return (
    <div className={`grid ${className} w-full`}>
      <WalletProvider {...chainOptions}>
        <WalletContext>
          <CurrentStep config={donaterConfig} />
        </WalletContext>
      </WalletProvider>
    </div>
  );
}
