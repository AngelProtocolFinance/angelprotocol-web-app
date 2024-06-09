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
    data,
    isLoading: isBookmarksLoading,
    isFetching,
    //FUTURE: wallet is may not be needed to edit bookmarks
  } = useUserBookmarksQuery(
    { userId: userEmail ?? "" },
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

  const bookmark = data?.bookmarks?.find((d) => d.endowId === endowId);
  const isBookmarked = bookmark !== undefined;

  async function toogleBookmark() {
    try {
      await toggle({
        endowId,
        type: isBookmarked ? "delete" : "add",
        wallet: "", //FUTURE: wallet may not be needed to edit bookmarks
      }).unwrap();
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
