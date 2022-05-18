import AppFoot from "components/AppFoot/AppFoot";
import DappHead from "components/DappHead/DappHead";
import Modal from "components/Modal/Modal";
import { WalletProvider } from "providers";
import Views from "./Views";

export default function App() {
  //TODO: refactor non-terra providers to redux
  return (
    <div className="grid grid-rows-a1a bg-gradient-to-b from-blue-accent to-black-blue relative pt-6">
      <p className="transition-shadow fixed z-20 top-0 inset-x-0 font-heading font-bold bg-angel-orange w-full p-2 text-center text-angel-grey text-xs">
        Terra donations are disabled until Terra V2 launch, currently accepting
        BNB & ETH.
      </p>
      <WalletProvider>
        <Modal classes="bg-black/50 fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center">
          <DappHead />
          <Views />
        </Modal>
        <AppFoot />
      </WalletProvider>
    </div>
  );
}
