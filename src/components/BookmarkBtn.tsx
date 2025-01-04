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
  const bms = user ? user.bookmarks : Promise.resolve([]);
  return (
    <Suspense fallback={<Heart size={19} className={`${classes} text-gray`} />}>
      <Await resolve={bms}>
        {(bms: EndowmentBookmark[]) => (
          <BookmarkBtn
            bookmarks={bms}
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
  user?: UserV2 | null;
  bookmarks: EndowmentBookmark[];
  classes?: string;
}

function BookmarkBtn({ user, bookmarks, classes = "", endowId }: IBookmarkBtn) {
  const fetcher = useFetcher();

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

  const isBookmarked =
    fetcher.formData?.get("action") === "add" ||
    bookmarks.some((bm) => bm.endowId === endowId);

  return (
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
      <fetcher.Form action="/" method="POST" className="contents">
        <input
          type="hidden"
          name="action"
          value={isBookmarked ? "delete" : "add"}
        />
        <input type="hidden" name="endowId" value={endowId} />
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
      </fetcher.Form>
    </Tooltip>
  );
}
