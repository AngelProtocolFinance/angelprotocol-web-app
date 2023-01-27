import { Popover } from "@headlessui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useWalletProfileQuery } from "services/aws/aws";
import { WalletState, useSetWallet } from "contexts/WalletContext";
import LoaderRing from "components/LoaderRing";
import { logger } from "helpers";
import { appRoutes } from "constants/routes";
import Address from "./Address";
import AdminLinks from "./AdminLinks";
import Balances from "./Balances";
import ChainSelector from "./ChainSelector";
import Favourites from "./Favourites";
import MobileTitle from "./MobileTitle";
import MyEndowments from "./MyEndowments";

export default function Details(props: WalletState) {
  const {
    data: profile,
    isLoading,
    isFetching,
    isError,
    error,
  } = useWalletProfileQuery(props.address);

  useEffect(() => {
    if (!isLoading && !isFetching && isError) {
      logger.error(error);
    }
  }, [isLoading, isFetching, isError, error]);

  return (
    <Popover.Panel className="fixed sm:absolute inset-0 sm:inset-auto sm:origin-top-right sm:mt-2 sm:right-0 flex flex-col w-full sm:w-80 bg-white dark:bg-blue-d6 sm:rounded-lg border border-prim shadow-[0_0_16px_rgba(15,46,67,0.25)] text-gray-d2 dark:text-white overflow-y-auto">
      {({ close }) => {
        if (isLoading || isFetching) {
          return (
            <div className="flex items-center justify-center w-full h-full sm:h-96">
              <LoaderRing thickness={10} classes="w-16" />
            </div>
          );
        }

        return (
          <>
            <MobileTitle className="sm:hidden" onClose={close} />
            <AdminLinks {...props} />

            {!!profile?.admin?.length && (
              <MyEndowments endowments={profile.admin} />
            )}

            <div className="grid gap-3 p-4 border-b border-prim">
              <Balances {...props} />
              <Address value={props.address} />
              <ChainSelector {...props} />
            </div>
            <MyDonations address={props.address} />
            <Favourites bookmarks={profile?.bookmarks} isError={isError} />
            <DisconnectBtn />
          </>
        );
      }}
    </Popover.Panel>
  );
}

function MyDonations({ address }: { address: string }) {
  return (
    <div className="flex items-center p-4 border-b border-prim">
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
      className="btn h-12 flex-none bg-orange-l5 dark:bg-blue-d5 hover:bg-orange-l3 hover:dark:bg-blue-d7 uppercase font-body font-bold text-base sm:rounded-b-lg "
    >
      disconnect
    </button>
  );
}
