import keplrWalletLogo from "assets/icons/wallets/keplr.png";
import { isDisconnected, useWalletContext } from "contexts/WalletContext";

export default function KeplrConnector() {
  const wallet = useWalletContext();
  const keplr = isDisconnected(wallet)
    ? wallet.find((w) => w.id === "keplr")
    : undefined;

  return (
    <button
      onClick={() => keplr?.connect()}
      className="flex items-center border border-gray-l2 dark:border-bluegray w-full p-4 rounded"
    >
      <img
        src={keplrWalletLogo}
        alt=""
        className="w-8 h-8 object-contain mr-4"
      />
      <span className="font-heading font-bold text-lg">Keplr</span>
    </button>
  );
}
