import keplrWalletLogo from "assets/icons/wallets/keplr.png";
import { useErrorContext } from "contexts/ErrorContext";
import { useSetWallet } from "contexts/WalletContext";
import Image from "components/Image";

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
      <Image src={keplrWalletLogo} className="w-8 h-8 mr-4" />
      <span className="font-heading font-bold text-lg">Keplr</span>
    </button>
  );
}
