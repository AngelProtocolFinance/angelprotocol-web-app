import AppFoot from "components/AppFoot/AppFoot";
import DappHead from "components/DappHead/DappHead";
import Modal from "components/Modal/Modal";
import { chainIDs } from "constants/chainIDs";
import useWalletContext from "hooks/useWalletContext";
import Views from "./Views";

export default function App() {
  const { wallet } = useWalletContext();
  const chainId = wallet?.network.chainID;

  if (wallet !== undefined && chainId !== chainIDs.terra_classic) {
    return <NetworkGuard />;
  }
  //TODO: refactor non-terra providers to redux
  return (
    <div className="grid grid-rows-a1a bg-gradient-to-b from-blue-accent to-black-blue relative pt-6">
      <p className="transition-shadow fixed z-20 top-0 inset-x-0 font-heading font-bold bg-angel-orange w-full p-2 text-center text-angel-grey text-xs">
        Please note: Donations are currently disabled. V2 coming soon!
      </p>

      <Modal classes="bg-black/50 fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center">
        <DappHead />
        <Views />
      </Modal>
      <AppFoot />
    </div>
  );
}

function NetworkGuard() {
  const { wallet } = useWalletContext();
  return (
    <div className="grid gap-2 place-self-center bg-white-grey font-heading border border-angel-grey/30 w-full max-w-xs h-46 rounded-md p-6 leading-normal">
      <p className="text-center mb-4">
        Kindly switch wallet network to{" "}
        <span className="font-semibold font-mono">Terra Classic</span> and
        reload the page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="uppercase bg-angel-blue text-white text-sm px-4 py-2 rounded-md font-bold"
      >
        Reload
      </button>

      <button
        onClick={() => wallet?.disconnect()}
        className="uppercase bg-angel-orange text-white text-sm px-4 py-2 rounded-md font-bold"
      >
        disconnect wallet
      </button>
    </div>
  );
}
