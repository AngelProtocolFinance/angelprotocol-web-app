import terraMobileIcon from "assets/icons/wallets/terra-mobile.png";
import terraExtIcon from "assets/icons/wallets/terra-extension.jpg";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import torusIcon from "assets/icons/wallets/torus.jpg";
import ledgerIcon from "assets/icons/wallets/ledger.png";
import { getIcon } from "./manageIcon";
import { Icons } from "./types";

export default function Icon() {
  const active_icon = (getIcon() as Icons) || Icons.metamask;
  return (
    <img
      src={icons[active_icon]}
      alt=""
      className="w-6 h-6 object-contain rounded-full mr-2 bg-white p-1"
    />
  );
}

export const icons: { [key in Icons]: string } = {
  [Icons.terra_ext]: terraExtIcon,
  [Icons.terra_mobile]: terraMobileIcon,
  [Icons.metamask]: metamaskIcon,
  [Icons.torus]: torusIcon,
  [Icons.ledger]: ledgerIcon,
};
