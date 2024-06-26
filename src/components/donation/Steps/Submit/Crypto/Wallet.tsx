import Image from "components/Image";
import type { DisconnectedWallet } from "types/wallet";

export default function Wallet({ connect, logo, name }: DisconnectedWallet) {
  return (
    <div className="flex items-center gap-2 border border-gray-l4 rounded p-3">
      <Image src={logo} className="size-7 rounded-full" />
      <span className="capitalize">{name}</span>
      <button
        type="button"
        onClick={connect}
        className="ml-auto px-6 py-2 rounded-full bg-gray-l5 text-xs hover:bg-gray-l4"
      >
        Connect
      </button>
    </div>
  );
}
