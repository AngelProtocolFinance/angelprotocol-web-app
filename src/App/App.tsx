import { WalletProvider as TerraProvider } from "@terra-money/wallet-provider";
import AppFoot from "components/AppFoot/AppFoot";
import DappHead from "components/DappHead/DappHead";
import Modal from "components/Modal/Modal";
import Metamask from "providers/Metamask/Metamask";
import WalletSuiteProvider from "providers/WalletSuiteProvider";
import { mainnet, walletConnectChainIds } from "./chains";
import Views from "./Views";
import BinanceWallet from "providers/BinanceWallet/BinanceWallet";

export default function App() {
  return (
    <div className="grid grid-rows-a1a bg-gradient-to-b from-blue-accent to-black-blue relative">
      <TerraProvider
        defaultNetwork={mainnet}
        walletConnectChainIds={walletConnectChainIds}
      >
        <WalletSuiteProvider>
          <Metamask>
            <BinanceWallet>
              <Modal classes="bg-black/50 fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center">
                <DappHead />
                <Views />
              </Modal>
              <AppFoot />
            </BinanceWallet>
          </Metamask>
        </WalletSuiteProvider>
      </TerraProvider>
    </div>
  );
}
