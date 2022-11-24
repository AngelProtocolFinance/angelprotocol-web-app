import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import { WalletState, useSetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import Favourites from "./Favourites";
import MyEndowment from "./MyEndowment";
import WalletDetails from "./WalletDetails";

export default function Details(props: WalletState) {
  return (
    <Popover.Panel className="fixed sm:absolute inset-0 sm:inset-auto sm:origin-top-right sm:mt-2 sm:right-0 flex flex-col sm:w-80 h-screen sm:h-fit bg-white dark:bg-blue-d6 sm:rounded-lg border border-gray-l2 dark:border-bluegray shadow-[0_0_16px_rgba(15,46,67,0.25)] text-gray-d2 dark:text-white overflow-y-auto">
      {({ close }) => (
        <>
          <MobileTitle onClose={close} />
          <MyEndowment />
          <WalletDetails {...props} />
          <MyDonations address={props.address} />
          <Favourites {...props} />
          <DisconnectBtn />
        </>
      )}
    </Popover.Panel>
  );
}

function MobileTitle({ onClose }: { onClose: () => void }) {
  return (
    <h3 className="flex sm:hidden justify-between items-center w-full px-4 py-3 bg-orange-l6 border-b border-gray-l2 dark:border-bluegray font-heading font-black text-xl text-orange uppercase dark:bg-blue-d7">
      Wallet
      <button
        className="flex items-center justify-center w-10 h-10 dark:border-bluegray dark:hover:border-bluegray-d1 text-gray-d2 hover:text-black dark:text-white dark:hover:text-gray"
        onClick={onClose}
      >
        <Icon type="Close" className="w-8 sm:w-7 h-8 sm:h-7" />
      </button>
    </h3>
  );
}

function MyDonations({ address }: { address: string }) {
  return (
    <div className="flex items-center p-4 border-b border-gray-l2 dark:border-bluegray">
      <Link
        to={`${appRoutes.donations}/${address}`}
        className="font-heading font-bold text-sm uppercase hover:text-orange"
      >
        My Donations
      </Link>
    </div>
  );
}

function DisconnectBtn() {
  const { disconnect } = useSetWallet();
  return (
    <button
      onClick={disconnect}
      className="btn h-12 bg-orange-l5 dark:bg-blue-d5 hover:bg-orange-l3 hover:dark:bg-blue-d7 uppercase font-body font-bold text-base sm:rounded-b-lg "
    >
      disconnect
    </button>
  );
}
