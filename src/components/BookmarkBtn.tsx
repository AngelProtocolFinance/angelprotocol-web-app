import { Arrow, Content, Tooltip } from "components/Tooltip";
import { useErrorContext } from "contexts/ErrorContext";
import { Heart } from "lucide-react";
import { Suspense } from "react";
import { Await } from "react-router-dom";
import { useToggleUserBookmarkMutation } from "services/aws/aws";
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
    <Suspense
      fallback={
        <Icon type="Heart" size={19} className={`${classes} text-gray`} />
      }
    >
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
  const { handleError } = useErrorContext();
  const [toggle, { isLoading: isTogglingBookmark }] =
    useToggleUserBookmarkMutation();

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

  const isBookmarked = bookmarks.some((bm) => bm.endowId === endowId);

  async function toogleBookmark() {
    try {
      await toggle({
        endowId,
        action: isBookmarked ? "delete" : "add",
      }).unwrap();
    } catch (err) {
      handleError(err, { context: "changing bookmark" });
    }
  }

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
      <button
        type="button"
        disabled={isTogglingBookmark}
        aria-label="Add to favorites button"
        onClick={toogleBookmark}
        className={`flex items-center gap-1 disabled:text-gray-l4 ${classes}`}
      >
        <Heart size={19} className={isBookmarked ? "fill-red text-red" : ""} />
      </button>
    </Tooltip>
  );
}
