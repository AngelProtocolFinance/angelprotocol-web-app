import { isConnected, useWalletContext } from "contexts/WalletContext";
import { simulate } from "./simulate";
import { simulateKeplr } from "./simulate-keplr";

export default function Marketplace() {
  const wallet = useWalletContext();

  if (!isConnected(wallet)) return <>connect wallet</>;
  return (
    <div className="pt-24 grid gap-4 justify-start">
      <button
        type="button"
        onClick={simulateKeplr}
        className="btn btn-orange p-4 rounded font-work"
      >
        simulate keplr
      </button>
    </div>
  );
}
