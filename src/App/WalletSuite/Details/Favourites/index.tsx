import { useWalletProfileQuery } from "services/aws/aws";
import { useConnectedWallet } from "contexts/WalletGuard";
import QueryLoader from "components/QueryLoader";
import Favourite from "./Favourite";

const MAX_ELEMENTS_TO_DISPLAY = 7;

export default function Favourites() {
  const wallet = useConnectedWallet();
  const queryState = useWalletProfileQuery(wallet.address);

  return (
    <div className="flex flex-col gap-3 max-h-[244px] flex-1 p-4 border-b border-gray-l2 dark:border-bluegray">
      <h3 className="flex justify-between gap-2 font-heading">
        <span className="font-bold text-sm text-gray-d1 dark:text-gray">
          Favourites
        </span>
        {/*
          Just a placeholder link until it is decided what page it should navigate to, see comment:
          https://app.clickup.com/t/3rcffb9?comment=1134342876&threadedComment=1813673953
        */}
        {/* <Link
          to={`${appRoutes.donations}/${"some address"}`}
          className="font-heading font-semibold text-xs uppercase underline underline-offset-2 decoration-1 text-orange hover:text-orange-l2 transition ease-in-out duration-300"
        >
          View All
        </Link> */}
      </h3>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching favorites..",
          error: "Failed to get favorite organisations.",
        }}
        classes={{ container: "text-xs gap-1" }}
      >
        {({ bookmarks }) => (
          <ul className="grid gap-1">
            {bookmarks.slice(0, MAX_ELEMENTS_TO_DISPLAY).map((b) => (
              <Favourite key={`favourite-${b.endowId}`} {...b} />
            ))}
          </ul>
        )}
      </QueryLoader>
    </div>
  );
}
