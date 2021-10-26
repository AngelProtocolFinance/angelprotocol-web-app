// import { ConnectType } from "@terra-money/wallet-provider";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import useAction from "./useAction";

export default function Action() {
  const { handleConnect, connecting } = useAction();
  return (
    <button
      disabled={connecting}
      onClick={handleConnect}
      className={`transform active:translate-x-1 bg-white text-angel-grey hover:bg-angel-blue hover:text-white flex items-center gap-2 rounded-full items-center p-1 pr-4 shadow-md`}
    >
      <img
        src={metamaskIcon}
        className="w-8 h-8 p-2 bg-white-grey rounded-full shadow-md"
        alt=""
      />
      <p className="uppercase text-sm">Metamask</p>
    </button>
  );
}
