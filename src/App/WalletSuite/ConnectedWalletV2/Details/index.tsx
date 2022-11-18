import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import { WalletState, useSetWallet } from "contexts/WalletContext";
import { appRoutes } from "constants/routes";
import Favourites from "./Favourites";
import MyEndowment from "./MyEndowment";
import WalletDetails from "./WalletDetails";

export default function Details(props: WalletState) {
  const { disconnect } = useSetWallet();

  return (
    <Popover.Panel className="absolute top-2 right-0 grid w-80 bg-white rounded-lg border border-gray-l2 shadow-[0_0_16px_rgba(15,46,67,0.25)] text-gray-d2">
      <MyEndowment />
      <WalletDetails {...props} />
      <div className="items-center p-4 border-b border-gray-l2">
        <Link
          to={`${appRoutes.donations}/${props.address}`}
          className="font-heading font-bold text-sm uppercase hover:text-orange"
        >
          My Donations
        </Link>
      </div>
      <Favourites {...props} />
      <button
        onClick={disconnect}
        className="btn h-12 bg-orange-l5 hover:bg-orange-l3 uppercase text-sm font-body font-bold text-base rounded-b"
      >
        disconnect
      </button>
    </Popover.Panel>
  );
}
