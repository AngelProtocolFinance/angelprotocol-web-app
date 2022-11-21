import { WalletProvider } from "@terra-money/wallet-provider";
import ModalContext from "contexts/ModalContext";
import WalletContext from "contexts/WalletContext";
import Footer from "./Footer";
import Header from "./Header";
import Views from "./Views";
import { chainOptions } from "./chainOptions";

export default function App() {
  return (
    <WalletProvider {...chainOptions}>
      <WalletContext>
        <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
          <div className="grid grid-rows-[1fr_auto] dark:from-blue-d3 dark:to-blue-d3 bg-fixed">
            <Header classes="fixed top-0 z-20 bg-blue dark:bg-blue-d3" />
            <Views />
            <Footer />
          </div>
        </ModalContext>
      </WalletContext>
    </WalletProvider>
  );
}
