import { WalletProvider as TerraProvider } from "@terra-money/wallet-provider";
import { mainnet, walletConnectChainIds } from "./chains";
import AppFoot from "components/Footers/AppFoot";
import Nodal from "components/Nodal/Nodal";
import Views from "./Views";
import DappHead from "components/Headers/DappHead";
import { ToastContainer } from "react-toastify";

export default function App() {
  //TODO: refactor non-terra providers to redux
  return (
    <div className="grid grid-rows-a1a bg-gradient-to-b from-blue-accent to-black-blue relative">
      <TerraProvider
        defaultNetwork={mainnet}
        walletConnectChainIds={walletConnectChainIds}
      >
        <Nodal classes="bg-black bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center">
          <DappHead />
          <Views />
        </Nodal>
        <AppFoot />
        <ToastContainer />
      </TerraProvider>
    </div>
  );
}
