import { keplrIcon } from "@ap/assets";
import { useErrorContext } from "@ap/contexts";
import { useSetWallet } from "@ap/contexts/wallet-context";

export default function KeplrConnector() {
  const { connections } = useSetWallet();
  const { handleError } = useErrorContext();

  async function handleConnect() {
    try {
      //wallet is connected at this point
      const keplrConnection = connections.find((c) => c.name === "Keplr")!;
      //keplr connection is single connection
      await keplrConnection!.connect!();
    } catch (err: any) {
      handleError(err);
    }
  }

  return (
    <button
      onClick={handleConnect}
      className="flex items-center border border-prim w-full p-4 rounded"
    >
      <img src={keplrIcon} alt="" className="w-8 h-8 object-contain mr-4" />
      <span className="font-heading font-bold text-lg">Keplr</span>
    </button>
  );
}
