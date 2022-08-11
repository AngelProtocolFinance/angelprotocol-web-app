import ModalContext from "contexts/ModalContext";
import WalletContext from "contexts/WalletContext/WalletContext";
import Footer from "./Footer";
import Header from "./Header";
import Views from "./Views";

export default function App() {
  return (
    <WalletContext>
      <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
        <div className="grid grid-rows-aa1a bg-gradient-to-b from-blue-accent to-black-blue">
          <p className="transition-shadow flex z-20 items-center justify-center font-heading font-bold bg-angel-orange w-full p-2 text-center text-angel-grey text-xs">
            Please note: Donations are currently disabled. V2 coming soon!
          </p>
          <Header />
          <Views />
          <Footer />
        </div>
      </ModalContext>
    </WalletContext>
  );
}
