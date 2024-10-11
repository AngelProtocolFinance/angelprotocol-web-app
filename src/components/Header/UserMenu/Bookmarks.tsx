import { useUserBookmarksQuery } from "services/aws/aws";
import { BookmarkLink } from "./EndowmentLink";

export function Bookmarks({ classes = "" }) {
  const { data: bookmarks = [] } = useUserBookmarksQuery(null);
  return (
    <div className={`${classes} hidden [&:has(a)]:grid mt-6 gap-2`}>
      <h5 className="uppercase text-xs text-navy-l1 -mb-1">My Favorites</h5>
      {bookmarks.map((endowId) => (
        <BookmarkLink key={endowId} endowId={endowId} />
      ))}
    </div>
  );
}
