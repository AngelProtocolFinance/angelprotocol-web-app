import terra_mobile from "assets/icons/wallets/terra-mobile.png";
import terra_ext from "assets/icons/wallets/terra-extension.jpg";
import metamask from "assets/icons/wallets/metamask.png";
import { getIcon } from "./manageIcon";
import { Icons } from "./types";

const icons: { [key in Icons]: string } = {
  [Icons.metamask]: metamask,
  [Icons.terra_ext]: terra_ext,
  [Icons.terra_mobile]: terra_mobile,
};

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
