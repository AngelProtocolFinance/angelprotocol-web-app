import { useBookmarksQuery } from "services/aws/aws";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { QueryLoader } from "components/admin";
import Bookmark from "./Bookmark";

export default function Bookmarks() {
  const { wallet } = useGetWallet();
  const queryState = useBookmarksQuery(wallet?.address!, { skip: !wallet });

  return (
    <div className={`p-3 text-angel-grey`}>
      <h3 className="uppercase font-bold">Favorites</h3>
      <QueryLoader
        queryState={queryState}
        messages={{
          empty: "You have not yet added any Organisations to your Favorites",
          error: "Failed to get favorite Organisations.",
          loading: "Fetching Organisations...",
        }}
        classes={{ container: "text-xs gap-1 mb-2" }}
      >
        {(bookmarks) => (
          <ul className="grid gap-y-2">
            {bookmarks.map((b) => (
              <Bookmark key={b.id} {...b} />
            ))}
          </ul>
        )}
      </QueryLoader>
    </div>
  );
}
