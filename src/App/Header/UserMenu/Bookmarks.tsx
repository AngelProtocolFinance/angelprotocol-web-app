import { useUserBookmarksQuery } from "services/aws/aws";
import EndowmentLink from "./EndowmentLink";

export function Bookmarks({ classes = "" }) {
  const { data: bookmarks = [] } = useUserBookmarksQuery({});
  return (
    <div className={`${classes} hidden [&:has(a)]:grid mt-6 gap-2`}>
      <h5 className="uppercase text-xs text-navy-l1 -mb-1">My Favorites</h5>
      {bookmarks.map((endowId) => (
        <EndowmentLink key={endowId} endowId={endowId} route="profile" />
      ))}
    </div>
  );
}
