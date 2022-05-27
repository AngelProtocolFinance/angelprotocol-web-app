import { useEthBalancesQuery } from "services/apes/tokens/tokens";
import ModalContext from "contexts/ModalContext";
import WalletContext from "contexts/WalletContext/WalletContext";
import AppFoot from "./AppFoot";
import DappHead from "./DappHead";
import Views from "./Views";

export default function App() {
  return (
    <div className="grid grid-rows-a1a bg-gradient-to-b from-blue-accent to-black-blue relative">
      <WalletContext>
        <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
          <DappHead />
          <Views />
        </ModalContext>
      </WalletContext>
      <AppFoot />
    </div>
  );
}
