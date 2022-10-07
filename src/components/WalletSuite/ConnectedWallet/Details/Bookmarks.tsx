import { useBookmarksQuery } from "services/aws/aws";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { QueryLoader } from "components/admin";

export default function Bookmarks() {
  const { wallet } = useGetWallet();
  const queryState = useBookmarksQuery(wallet?.address!, { skip: !wallet });

  return (
    <div className="px-3 my-1">
      <h3 className="uppercase text-angel-grey font-bold mt-4">
        My endowments
      </h3>
      <QueryLoader
        queryState={queryState}
        messages={{
          empty: "You have not bookmarked any endowments yet",
          error: "Failed to get bookmarked endowments..",
          loading: "Fetching endowments.",
        }}
        classes={{ container: "text-angel-grey text-sm gap-1 mb-2" }}
      >
        {(bookmarks) => (
          <ul>
            {bookmarks.map(({ name, id }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        )}
      </QueryLoader>
    </div>
  );
}
