import { Link } from "react-router-dom";
import { useBookmarksQuery } from "services/aws/aws";
import { WalletState } from "contexts/WalletContext";
import { QueryLoader } from "components/admin";
import { appRoutes } from "constants/routes";
import Bookmark from "./Bookmark";

const MAX_ELEMENTS_TO_DISPLAY = 7;

export default function Favourites(props: WalletState) {
  const queryState = useBookmarksQuery(props.address);

  return (
    <div className="flex flex-col gap-3 min-h-[244px] flex-1 p-4 border-b border-gray-l2 dark:border-bluegray">
      <h3 className="flex justify-between gap-2 font-heading">
        <span className="font-bold text-sm text-gray-d1 dark:text-gray">
          Favourites
        </span>
        {/*
          Just a placeholder link until it is decided what page it should navigate to, see comment:
          https://app.clickup.com/t/3rcffb9?comment=1134342876&threadedComment=1813673953
        */}
        <Link
          to={`${appRoutes.donations}/${props.address}`}
          className="font-heading font-semibold text-xs uppercase underline underline-offset-2 decoration-1 text-orange hover:text-orange-l2 transition ease-in-out duration-300"
        >
          View All
        </Link>
      </h3>
      <QueryLoader
        queryState={queryState}
        messages={{
          empty: "No favourites",
          error: "Failed to get favorite organisations.",
          loading: "Fetching favourites...",
        }}
        classes={{ container: "text-xs gap-1" }}
      >
        {(bookmarks) => (
          <ul className="grid gap-1">
            {bookmarks.slice(0, MAX_ELEMENTS_TO_DISPLAY).map((b) => (
              <Bookmark key={b.id} {...b} />
            ))}
          </ul>
        )}
      </QueryLoader>
    </div>
  );
}
