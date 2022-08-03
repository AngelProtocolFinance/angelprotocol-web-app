import {
  WalletControllerChainOptions,
  WalletProvider,
  getChainOptions,
} from "@terra-money/wallet-provider";
import { useEffect, useState } from "react";
import ModalContext from "contexts/ModalContext";
import WalletContext from "contexts/WalletContext/WalletContext";
import Loader from "components/Loader";
import AppFoot from "./AppFoot";
import DappHead from "./DappHead";
import Views from "./Views";

const backgroundColor = "bg-gradient-to-b from-blue-accent to-black-blue";

export default function App() {
  const [chainOptions, setChainOptions] =
    useState<WalletControllerChainOptions>();

  useEffect(() => {
    (async () => {
      const fetchedChainOptions = await getChainOptions();
      setChainOptions(fetchedChainOptions);
    })();
  }, []);

  if (!chainOptions) {
    return (
      <div
        className={`flex h-screen items-center justify-center ${backgroundColor}`}
      >
        <Loader
          bgColorClass="bg-white-grey"
          gapClass="gap-2"
          widthClass="w-4"
        />
      </div>
    );
  }

  return (
    <div className={`grid grid-rows-aa1a ${backgroundColor}`}>
      <p className="transition-shadow flex z-20 items-center justify-center font-heading font-bold bg-angel-orange w-full p-2 text-center text-angel-grey text-xs">
        Please note: Donations are currently disabled. V2 coming soon!
      </p>
      <WalletProvider {...chainOptions}>
        <WalletContext>
          <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
            <DappHead />
            <Views />
          </ModalContext>
        </WalletContext>
      </WalletProvider>
      <AppFoot />
    </div>
  );
}
