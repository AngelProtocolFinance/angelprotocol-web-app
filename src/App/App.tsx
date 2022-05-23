import BinanceWalletContext from "contexts/BinanceWalletContext/BinanceWalletContext";
import Metamask from "contexts/MetamaskContext/MetamaskContext";
import ModalContext from "contexts/ModalContext";
import AppFoot from "./AppFoot";
import DappHead from "./DappHead";
import Views from "./Views";

export default function App() {
  return (
    <div className="grid grid-rows-a1a bg-gradient-to-b from-blue-accent to-black-blue relative">
      <Metamask>
        <BinanceWalletContext>
          <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
            <DappHead />
            <Views />
          </ModalContext>
          <AppFoot />
        </BinanceWalletContext>
      </Metamask>
    </div>
  );
}
