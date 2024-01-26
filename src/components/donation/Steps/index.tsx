import { WalletProvider } from "@terra-money/wallet-provider";
import { chainOptions } from "constants/chainOptions";
import WalletContext from "contexts/WalletContext";
import { DonaterConfigFromWidget } from "types/widget";
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
