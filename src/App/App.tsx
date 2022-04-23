import { WalletProvider } from "providers";
import AppFoot from "components/AppFoot/AppFoot";
import DappHead from "components/DappHead/DappHead";
import ModalContext from "components/ModalContext/ModalContext";
import Views from "./Views";

export default function App() {
  //TODO: refactor non-terra providers to redux
  return (
    <div className="grid grid-rows-a1a bg-gradient-to-b from-blue-accent to-black-blue relative">
      <WalletProvider>
        <ModalContext backdropClasses="bg-black/50 fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center">
          <DappHead />
          <Views />
        </ModalContext>
        <AppFoot />
      </WalletProvider>
    </div>
  );
}
