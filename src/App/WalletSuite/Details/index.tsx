import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import { ConnectedWallet, isEVM } from "contexts/WalletContext";
import { appRoutes } from "constants/routes";
import Address from "./Address";
import AdminLinks from "./AdminLinks";
import Balances from "./Balances";
import ChainSelector from "./ChainSelector";
import Favourites from "./Favourites";
import MobileTitle from "./MobileTitle";
import MyEndowments from "./MyEndowments";

export default function Details(props: ConnectedWallet) {
  return (
    <Popover.Panel className="fixed sm:absolute inset-0 sm:inset-auto sm:origin-top-right sm:mt-2 sm:right-0 flex flex-col w-full sm:w-80 bg-white dark:bg-blue-d6 sm:rounded-lg border border-gray-l2 dark:border-bluegray shadow-[0_0_16px_rgba(15,46,67,0.25)] text-gray-d2 dark:text-white overflow-y-auto">
      {({ close }) => (
        <>
          <MobileTitle className="sm:hidden" onClose={close} />
          <AdminLinks {...props} />
          <MyEndowments />
          <div className="grid gap-3 p-4 border-b border-gray-l2 dark:border-bluegray">
            <Balances />
            <Address value={props.address} />
            <ChainSelector {...props} />
          </div>
          <MyDonations address={props.address} />
          <Favourites />
          <button
            disabled={isEVM(props) && props.isSwitching}
            onClick={props.disconnect}
            className="btn h-12 flex-none bg-orange-l5 disabled:bg-gray-l2 dark:disabled:bg-bluegray-d1 dark:bg-blue-d5 hover:bg-orange-l3 hover:dark:bg-blue-d7 uppercase font-body font-bold text-base sm:rounded-b-lg "
          >
            disconnect
          </button>
        </>
      )}
    </Popover.Panel>
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
