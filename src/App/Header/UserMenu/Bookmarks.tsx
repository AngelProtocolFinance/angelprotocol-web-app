import { useUserBookmarksQuery } from "services/aws/aws";
import EndowmentLink from "./EndowmentLink";

interface IBookmarks {
  classes?: string;
  userId: string;
}
export function Bookmarks({ classes = "", userId }: IBookmarks) {
  const { data: bookmarks = [] } = useUserBookmarksQuery({ userId });
  return (
    <div className={`${classes} hidden [&:has(a)]:grid mt-6 gap-2`}>
      <h5 className="uppercase text-xs text-navy-l1 -mb-1">My Favorites</h5>
      {bookmarks.map((endowId) => (
        <EndowmentLink key={endowId} endowId={endowId} />
      ))}
    </div>
  );
}
