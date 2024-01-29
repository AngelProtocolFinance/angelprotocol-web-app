import Image from "components/Image";
import { DisconnectedWallet } from "types/wallet";

export default function Wallet({ connect, logo, name }: DisconnectedWallet) {
  return (
    <button
      className="flex flex-col items-center justify-center gap-1 h-28 p-5 border border-gray-l3 rounded bg-white hover:bg-orange-l5 dark:bg-blue/50 hover:dark:bg-blue-d3 dark:border-none"
      onClick={connect}
    >
      <Image src={logo} className="w-12 h-12 rounded-full" />
      <span className="font-heading font-bold text-sm capitalize">{name}</span>
    </button>
  );
}
