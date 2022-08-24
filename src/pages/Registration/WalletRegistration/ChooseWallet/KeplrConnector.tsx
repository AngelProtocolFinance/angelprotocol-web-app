import keplrWalletLogo from "assets/icons/wallets/keplr.png";
import { useErrorContext } from "contexts/ErrorContext";
import { useWalletContext } from "contexts/WalletContext";

export default function KeplrConnector() {
  const { connections } = useWalletContext();
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
      className="flex justify-content items-center gap-2 border border-white/50 p-6 rounded-md f hover:bg-white/10 active:bg-white/40"
    >
      <img src={keplrWalletLogo} alt="" className="w-8 h-8 object-contain" />
      <span className="font-heading uppercase">connect keplr wallet</span>
    </button>
  );
}
