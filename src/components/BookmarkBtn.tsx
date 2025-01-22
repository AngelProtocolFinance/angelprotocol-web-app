import { Await, useFetcher } from "@remix-run/react";
import { Arrow, Content, Tooltip } from "components/Tooltip";
import { Heart } from "lucide-react";
import { Suspense } from "react";
import type { DetailedUser, UserV2 } from "types/auth";
import type { EndowmentBookmark } from "types/aws";

type Props = {
  classes?: string;
  endowId: number;
  user: DetailedUser | null;
};

export default function Loader({ classes = "", user, endowId }: Props) {
  if (!user) {
    return (
      <Tooltip
        tip={
          <Content className="px-4 py-2 bg-navy-d4 text-white text-sm rounded-lg shadow-lg">
            Login to save your favorites
            <Arrow />
          </Content>
        }
      >
        <Heart size={19} className={`${classes} text-gray`} />
      </Tooltip>
    );
  }
  return (
    <Suspense fallback={<Heart size={19} className={`${classes} text-gray`} />}>
      <Await resolve={user.bookmarks}>
        {(loaded) => (
          <BookmarkBtn
            bookmarks={loaded}
            user={user}
            endowId={endowId}
            classes={classes}
          />
        )}
      </Await>
    </Suspense>
  );
}

interface IBookmarkBtn {
  /** user endow */
  endowId: number;
  user: UserV2;
  bookmarks: EndowmentBookmark[];
  classes?: string;
}

function BookmarkBtn({ bookmarks, classes = "", endowId }: IBookmarkBtn) {
  const fetcher = useFetcher();

  const action = fetcher.formData?.get("action");
  const isBookmarked = action
    ? action === "add"
    : bookmarks.some((bm) => bm.endowId === endowId);

  return (
    <fetcher.Form action="/" method="POST" className="contents">
      <input
        type="hidden"
        name="action"
        value={isBookmarked ? "delete" : "add"}
      />
      <input type="hidden" name="endowId" value={endowId} />
      <Tooltip
        tip={
          !isBookmarked ? (
            <Content className="px-4 py-2 bg-navy-d4 text-white text-sm rounded-lg shadow-lg">
              Add to favorites
              <Arrow />
            </Content>
          ) : null
        }
      >
        <button
          name="intent"
          value="toggle-bookmark"
          type="submit"
          disabled={fetcher.state !== "idle"}
          aria-label="Add to favorites button"
          className={`flex items-center gap-1 disabled:text-gray-l4 ${classes}`}
        >
          <Heart
            size={19}
            className={isBookmarked ? "fill-red text-red" : ""}
          />
        </button>
      </Tooltip>
    </fetcher.Form>
  );
}
