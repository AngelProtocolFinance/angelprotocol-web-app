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
          <div className="grid grid-rows-[auto_1fr_auto] bg-white dark:bg-blue-d5 bg-fixed">
            <Header classes="sticky top-0 z-20" />
            <Views />
            <Footer />
          </div>
        </ModalContext>
      </WalletContext>
    </WalletProvider>
  );
}
