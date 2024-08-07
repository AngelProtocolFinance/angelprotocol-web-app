import Icon from "components/Icon";
import Tooltip from "components/Tooltip";
import { useErrorContext } from "contexts/ErrorContext";
import { type PropsWithChildren, useRef } from "react";
import {
  useToggleUserBookmarkMutation,
  useUserBookmarksQuery,
} from "services/aws/aws";
import { useGetter } from "store/accessors";
import { userIsSignedIn } from "types/auth";
import type { EndowmentBookmark } from "types/aws";

type Props = PropsWithChildren<
  Pick<EndowmentBookmark, "endowId"> & { classes?: string }
>;

export default function BookmarkBtn({
  endowId,
  children,
  classes = "",
}: Props) {
  const { user } = useGetter((state) => state.auth);
  const userEmail = userIsSignedIn(user) ? user.email : "";
  const ref = useRef<HTMLButtonElement>(null);

  const { data: bookmarks = [], isLoading: isBookmarksLoading } =
    useUserBookmarksQuery(null, {
      skip: !userEmail,
    });
  const { handleError, displayError } = useErrorContext();

  const [toggle, { isLoading: isTogglingBookmark }] =
    useToggleUserBookmarkMutation();

  const isBookmarked = bookmarks.includes(endowId);

  async function toogleBookmark() {
    try {
      if (!userEmail) {
        return displayError("Kindly login to save your favorites");
      }

      await toggle({
        endowId,
        action: isBookmarked ? "delete" : "add",
      }).unwrap();
    } catch (err) {
      handleError(err, { context: "changing bookmark" });
    }
  }

  return (
    <>
      {!isBookmarked && <Tooltip anchorRef={ref} content="Add to favorites" />}
      <button
        ref={ref}
        type="button"
        aria-label="Add to favorites button"
        onClick={toogleBookmark}
        disabled={isBookmarksLoading || isTogglingBookmark}
        className={`flex items-center gap-1 disabled:text-gray-l4 ${
          isBookmarked ? "text-red" : ""
        } ${classes}`}
      >
        <Icon type={isBookmarked ? "HeartFill" : "HeartOutline"} size={20} />
        {children}
      </button>
    </>
  );
}
