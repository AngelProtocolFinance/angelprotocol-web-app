import { useWallet, ConnectType } from "@terra-money/wallet-provider";
import { useHeaderColors } from "contexts/HeaderColorProvider";
import { IoMdWallet } from "react-icons/io";

export default function Installer() {
  const { textColor } = useHeaderColors();
  const { availableInstallTypes, install } = useWallet();
  const isInstallable = availableInstallTypes.includes(
    ConnectType.CHROME_EXTENSION
  );

  if (isInstallable) {
    return (
      <button
        className={`text-${textColor} hover:text-opacity-75 flex py-1 px-2 rounded-sm uppercase text-sm font-semibold border-2 border-${textColor}`}
        onClick={() => install(ConnectType.CHROME_EXTENSION)}
      >
        <IoMdWallet className="text-lg mr-1" />
        Install
      </button>
    );
  } else {
    return null;
  }
}
