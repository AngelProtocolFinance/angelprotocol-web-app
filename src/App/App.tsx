import { WalletProvider as TerraProvider } from "@terra-money/wallet-provider";
import { mainnet, walletConnectChainIds } from "./chains";
import AppFoot from "components/AppFoot/AppFoot";
import Modal from "components/Modal/Modal";
import Views from "./Views";
import DappHead from "components/DappHead/DappHead";

export default function App() {
  return (
    <div className="grid grid-rows-a1a bg-gradient-to-b from-blue-accent to-black-blue relative">
      <TerraProvider
        defaultNetwork={mainnet}
        walletConnectChainIds={walletConnectChainIds}
      >
        <Modal classes="bg-black bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center">
          <DappHead />
          <Views />
        </Modal>
        <AppFoot />
      </TerraProvider>
    </div>
  );
}
