import Icon from "components/Icon";
import Tooltip from "components/Tooltip";
import { useErrorContext } from "contexts/ErrorContext";
import { type PropsWithChildren, useRef, useState } from "react";
import {
  useAddUserBookmarkMutation,
  useDeleteUserBookmarkMutation,
  useUserBookmarksQuery,
} from "services/aws/aws";
import { useGetter } from "store/accessors";
import { userIsSignedIn } from "types/auth";
import type { EndowmentBookmark } from "types/aws";

type Props = PropsWithChildren<Pick<EndowmentBookmark, "endowId">>;

export default function BookmarkBtn({ endowId, children }: Props) {
  const { user } = useGetter((state) => state.auth);
  const userEmail = userIsSignedIn(user) ? user.email : "";
  const [isHovered, setHovered] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const {
    data: bookmarks = [],
    isLoading: isBookmarksLoading,
    isFetching,
  } = useUserBookmarksQuery(
    { userId: userEmail },
    {
      skip: !userEmail,
    }
  );
  const { handleError } = useErrorContext();
  const [addBookmark, { isLoading: isAddingBookmark }] =
    useAddUserBookmarkMutation();
  const [deleteBookmark, { isLoading: isDeletingBookmark }] =
    useDeleteUserBookmarkMutation();

  const isLoading =
    isBookmarksLoading || isFetching || isAddingBookmark || isDeletingBookmark;

  const isBookmarked = bookmarks.includes(endowId);

  async function toogleBookmark() {
    try {
      if (isBookmarked) {
        await deleteBookmark({ bookmarkId: endowId, userId: userEmail });
      }
      await addBookmark({ userId: userEmail, endowId });
    } catch (err) {
      handleError(err, { context: "changing bookmark" });
    }
  }

  return (
    <>
      <Tooltip anchorRef={ref} content="Add to favorites" />
      <button
        ref={ref}
        type="button"
        aria-label="Add to favorites button"
        onClick={toogleBookmark}
        disabled={isLoading}
        className={`flex items-center gap-1 ${
          isBookmarked || isHovered ? "text-red" : ""
        }`}
        onMouseOver={(e) => {
          e.preventDefault();
          setHovered(true);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          setHovered(false);
        }}
      >
        <Icon
          type={
            isLoading
              ? "Loading"
              : isBookmarked || isHovered
                ? "HeartFill"
                : "HeartOutline"
          }
          className={isLoading ? "animate-spin" : ""}
          size={20}
        />
        {children}
      </button>
    </>
  );
}
