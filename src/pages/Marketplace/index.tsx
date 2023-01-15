import { isConnected, useWalletContext } from "contexts/WalletContext";
import { decodeTx, simulate } from "./simulate";

export default function Marketplace() {
  const wallet = useWalletContext();

  if (!isConnected(wallet)) return <>connect wallet</>;
  return (
    <div className="pt-24">
      <button
        onClick={simulate}
        className="btn btn-orange p-4 rounded font-work"
      >
        simulate
      </button>
      <button
        onClick={decodeTx}
        className="btn btn-orange p-4 rounded font-work"
      >
        decode
      </button>
    </div>
  );
}
