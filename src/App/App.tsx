import ModalContext from "contexts/ModalContext";
import {
  useGetWallet,
  useSetWallet,
} from "contexts/WalletContext/WalletContext";
import isTerraProvider from "contexts/WalletContext/helpers/isTerraProvider";
import { chainIDs } from "constants/chainIDs";
import AppFoot from "./AppFoot";
import DappHead from "./DappHead";
import Views from "./Views";

export default function App() {
  const { wallet } = useGetWallet();

  if (
    wallet &&
    isTerraProvider(wallet.providerId) &&
    wallet.chainId !== chainIDs.terra_classic
  ) {
    return <NetworkGuard />;
  }
  //TODO: refactor non-terra providers to redux
  return (
    <div className="grid grid-rows-a1a bg-gradient-to-b from-blue-accent to-black-blue relative pt-6">
      <p className="transition-shadow fixed z-20 top-0 inset-x-0 font-heading font-bold bg-angel-orange w-full p-2 text-center text-angel-grey text-xs">
        Please note: Donations are currently disabled. V2 coming soon!
      </p>

      <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
        <DappHead />
        <Views />
      </ModalContext>
      <AppFoot />
    </div>
  );
}

function NetworkGuard() {
  const { disconnect } = useSetWallet();
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
        onClick={() => disconnect()}
        className="uppercase bg-angel-orange text-white text-sm px-4 py-2 rounded-md font-bold"
      >
        disconnect wallet
      </button>
    </div>
  );
}
