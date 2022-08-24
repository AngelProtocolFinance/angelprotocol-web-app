import {
  WalletControllerChainOptions,
  WalletProvider,
  getChainOptions,
} from "@terra-money/wallet-provider";
import { useEffect, useState } from "react";
import ModalContext from "contexts/ModalContext";
import WalletContext from "contexts/WalletContext";
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

  return (
    <div className="grid grid-rows-[auto_1fr_auto] bg-gradient-to-b from-blue-accent to-black-blue bg-fixed">
      <p className="transition-shadow flex z-20 items-center justify-center font-heading font-bold bg-angel-orange w-full p-2 text-center text-angel-grey text-xs">
        Please note: Donations are currently disabled. V2 coming soon!
      </p>
      {!chainOptions ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loader
            bgColorClass="bg-white-grey"
            gapClass="gap-2"
            widthClass="w-4"
          />
        </div>
      ) : (
        <div className="grid grid-rows-[auto_1fr] w-full h-full">
          <WalletProvider {...chainOptions}>
            <WalletContext>
              <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
                <Header />
                <Views />
              </ModalContext>
            </WalletContext>
          </WalletProvider>
        </div>
      )}
      <Footer />
    </div>
  );
}
