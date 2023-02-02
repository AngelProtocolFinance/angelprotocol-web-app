import { WalletProvider } from "@terra-money/wallet-provider";
import ModalContext from "contexts/ModalContext";
import WalletContext from "contexts/WalletContext";
import Seo from "components/Seo";
import Footer from "./Footer";
import Header from "./Header";
import Views from "./Views";
import { chainOptions } from "./chainOptions";

export default function App() {
  return (
    <WalletProvider {...chainOptions}>
      <WalletContext>
        <ModalContext>
          <div className="grid grid-rows-[auto_1fr_auto]">
            <Seo /> {/* Load all defaults for SEO meta tags */}
            <Header classes="sticky top-0 z-20" />
            <Views />
            <Footer />
          </div>
        </ModalContext>
      </WalletContext>
    </WalletProvider>
  );
}
