import { WalletProvider } from "providers";
import AppFoot from "components/AppFoot/AppFoot";
import DappHead from "components/DappHead/DappHead";
import ModalContext from "components/ModalContext/ModalContext";
import Views from "./Views";

export default function App() {
  return (
    <div className="grid grid-rows-a1a bg-gradient-to-b from-blue-accent to-black-blue relative">
      <WalletProvider>
        <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
          <DappHead />
          <Views />
        </ModalContext>
        <AppFoot />
      </WalletProvider>
    </div>
  );
}
