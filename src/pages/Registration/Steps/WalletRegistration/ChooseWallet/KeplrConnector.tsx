import keplrWalletLogo from "assets/icons/wallets/keplr.png";
import { useErrorContext } from "contexts/ErrorContext";
import { useSetWallet } from "contexts/WalletContext";

export default function KeplrConnector() {
  const { connections } = useSetWallet();
  const { handleError } = useErrorContext();

  async function handleConnect() {
    try {
      const keplrConnection = connections.find((c) => c.name === "Keplr")!;
      await keplrConnection!.connect!();
    } catch (err: any) {
      handleError(err);
    }
  }

  return (
    <button
      onClick={handleConnect}
      className="flex justify-content items-center gap-2 p-6 rounded-md btn-outline-orange"
    >
      <img src={keplrWalletLogo} alt="" className="w-8 h-8 object-contain" />
      <span className="font-heading uppercase">connect keplr wallet</span>
    </button>
  );
}
