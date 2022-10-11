import {
  WalletControllerChainOptions,
  WalletProvider,
  getChainOptions,
} from "@terra-money/wallet-provider";
import { useEffect, useState } from "react";
import ModalContext from "contexts/ModalContext";
import WalletContext from "contexts/WalletContext/WalletContext";
import Loader from "components/Loader";
import Footer from "./Footer";
import Header from "./Header";
import Views from "./Views";

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
      <div className="flex justify-center items-center w-full h-full">
        <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] bg-gradient-to-b from-blue to-black bg-fixed">
      <WalletProvider {...chainOptions}>
        <WalletContext>
          <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
            <Header />
            <Views />
          </ModalContext>
        </WalletContext>
      </WalletProvider>
      <Footer />
    </div>
  );
}
