import { chainOptions } from "@ap/constants";
import { ModalContext } from "@ap/contexts";
import WalletContext from "@ap/contexts/wallet-context";
import Footer from "@ap/layouts/footer";
import Header from "@ap/layouts/header";
import { WalletProvider } from "@terra-money/wallet-provider";

export default function App() {
  return (
    <WalletProvider {...chainOptions}>
      <WalletContext>
        <ModalContext>
          <div className="grid grid-rows-[auto_1fr_auto] ">
            <Header
              classes="sticky top-0 z-20"
              links={[
                { href: "dashboard", title: "Dashboard" },
                { href: "register", title: "Register" },
              ]}
              relative
            />
            <div>hello world</div>

            <Footer />
          </div>
        </ModalContext>
      </WalletContext>
    </WalletProvider>
  );
}
