import AppFoot from "components/AppFoot/AppFoot";
import DappHead from "components/DappHead/DappHead";
import Modal from "components/Modal/Modal";
import { WalletProvider } from "providers";
import Views from "./Views";

export default function App() {
  return (
    <div className="grid grid-rows-a1a bg-gradient-to-b from-blue-accent to-black-blue relative">
      <WalletProvider>
        <Modal classes="bg-black bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center">
          <DappHead />
          <Views />
        </Modal>
        <AppFoot />
      </WalletProvider>
    </div>
  );
}
