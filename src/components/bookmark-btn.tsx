import { Arrow, Content, Tooltip } from "components/tooltip";
import { Heart } from "lucide-react";
import { Suspense } from "react";
import { Await, useFetcher } from "react-router";
import type { DetailedUser, UserV2 } from "types/auth";
import type { INpoBookmark } from "types/user";

type Props = {
  classes?: string;
  endowId: number;
  user: DetailedUser | null;
};

export function BookmarkBtn({ classes = "", user, endowId }: Props) {
  if (!user) {
    return (
      <Tooltip
        tip={
          <Content className="px-4 py-2 bg-gray-d4 text-white text-sm rounded-lg shadow-lg">
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
          <Loaded
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

interface ILoaded {
  /** user endow */
  endowId: number;
  user: UserV2;
  bookmarks: INpoBookmark[];
  classes?: string;
}

function Loaded({ bookmarks, classes = "", endowId }: ILoaded) {
  const fetcher = useFetcher({ key: `bookmark-${endowId}` });
  const isBookmarked = fetcher.data
    ? fetcher.data === "add"
    : bookmarks.some((bm) => bm.id === endowId);

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
            <Content className="px-4 py-2 bg-gray-d4 text-white text-sm rounded-lg shadow-lg">
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
