import { Popover } from "@headlessui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProfileQuery } from "services/aws/aws";
import { ConnectedWallet } from "contexts/Wallet";
import LoaderRing from "components/LoaderRing";
import { logger } from "helpers";
import { appRoutes } from "constants/routes";
import AdminLinks from "./AdminLinks";
import Bookmarks from "./Bookmarks";
import MobileTitle from "./MobileTitle";
import MyEndowments from "./MyEndowments";
import WalletDetails from "./WalletDetails";

export default function Details(props: ConnectedWallet) {
  const {
    data: profile,
    isLoading,
    isFetching,
    isError,
    error,
  } = useProfileQuery(props.address);

  useEffect(() => {
    if (!isLoading && !isFetching && isError) {
      logger.error(error);
    }
  }, [isLoading, isFetching, isError, error]);

  return (
    <Popover.Panel className="fixed sm:absolute inset-0 sm:inset-auto sm:origin-top-right sm:mt-2 sm:right-0 flex flex-col w-full sm:w-80 bg-white dark:bg-blue-d6 sm:rounded-lg border border-gray-l2 dark:border-bluegray shadow-[0_0_16px_rgba(15,46,67,0.25)] text-gray-d2 dark:text-white overflow-y-auto">
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

            <WalletDetails {...props} />
            <MyDonations address={props.address} />
            <Bookmarks bookmarks={profile?.endowments} isError={isError} />
            <button
              onClick={props.disconnect}
              className="btn h-12 flex-none bg-orange-l5 dark:bg-blue-d5 hover:bg-orange-l3 hover:dark:bg-blue-d7 uppercase font-body font-bold text-base sm:rounded-b-lg "
            >
              disconnect
            </button>
          </>
        );
      }}
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
