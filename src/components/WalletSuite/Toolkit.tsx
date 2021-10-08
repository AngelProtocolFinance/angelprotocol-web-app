import { useGetWallet } from "./WalletSuite";
import { Icons, Wallets } from "./types";
import { IoWalletSharp } from "react-icons/io5";
import useInitializer from "./useInitialzer";

export default function Toolkit() {
  const { activeWallet } = useGetWallet();
  useInitializer();
  const isConnected = activeWallet !== Wallets.none;

  console.log(activeWallet);
  return (
    <div className="border rounded-md flex items-center gap-2 p-2">
      {icons[activeWallet]}
      {!isConnected && <button>connect button</button>}
      <button>details</button>
    </div>
  );
}
const icons: Icons = {
  [Wallets.none]: <IoWalletSharp className="text-white text-xl" />,
  [Wallets.terraStationExt]: "terra station",
  [Wallets.terraStationMobile]: "terra station",
};
