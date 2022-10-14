import { WalletProvider } from "@terra-money/wallet-provider";
import ModalContext from "contexts/ModalContext";
import WalletContext from "contexts/WalletContext/WalletContext";
import Footer from "./Footer";
import Header from "./Header";
import Views from "./Views";
import { chainOptions } from "./chainOptions";

export default function App() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] bg-orange-l6 dark:bg-blue-d5">
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
