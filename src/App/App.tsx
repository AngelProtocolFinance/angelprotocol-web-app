import ModalContext from "contexts/ModalContext";
import WalletContext from "contexts/WalletContext";
import Footer from "./Footer";
import Header from "./Header";
import Views from "./Views";

export default function App() {
  return (
    <WalletContext>
      <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
        <div className="grid grid-rows-[auto_1fr_auto] bg-gray-l5 dark:bg-blue-d5 text-gray-d2 dark:text-white">
          <Header classes="sticky top-0 z-20" />
          <Views />
          <Footer />
        </div>
      </ModalContext>
    </WalletContext>
  );
}
