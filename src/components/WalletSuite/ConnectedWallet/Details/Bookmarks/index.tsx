import { useBookmarksQuery } from "services/aws/aws";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { QueryLoader } from "components/admin";
import Bookmark from "./Bookmark";

export default function Bookmarks({ classes = "" }: { classes?: string }) {
  const { wallet } = useGetWallet();
  const queryState = useBookmarksQuery(wallet?.address!, { skip: !wallet });

  return (
    <div className={`p-3 ${classes} text-angel-grey`}>
      <h3 className="uppercase font-bold">Favorites</h3>
      <QueryLoader
        queryState={queryState}
        messages={{
          empty: "You have not bookmarked any endowments yet",
          error: "Failed to get bookmarked endowments..",
          loading: "Fetching endowments.",
        }}
        classes={{ container: "text-sm gap-1 mb-2" }}
      >
        {(bookmarks) => (
          <ul className="grid gap-y-3">
            {bookmarks.map((b) => (
              <Bookmark key={b.id} {...b} />
            ))}
          </ul>
        )}
      </QueryLoader>
    </div>
  );
}
