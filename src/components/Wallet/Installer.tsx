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
        className={`${textColor} bg-angel-orange py-1 px-2 rounded-sm shadow-sm uppercase text-sm font-semibold`}
        onClick={() => install}
      >
        <IoMdWallet className="text-lg mr-1" /> Install Extension
      </button>
    );
  } else {
    return null;
  }
}
