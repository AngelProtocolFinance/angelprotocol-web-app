import Icon from "@giving/components/Icon";
import Popup from "@giving/components/Popup";
import Tooltip from "@giving/components/Tooltip";
import { useGetWallet } from "@giving/contexts/wallet-context";
import { PropsWithChildren, useRef, useState } from "react";
import { EndowmentBookmark } from "@giving/types/aws";
import {
  useToggleBookmarkMutation,
  useWalletProfileQuery,
} from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";

type Props = PropsWithChildren<Pick<EndowmentBookmark, "endowId">>;

export default function BookmarkBtn({ endowId, children }: Props) {
  const [isHovered, setHovered] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const { wallet, isLoading: isWalletLoading } = useGetWallet();
  const {
    data,
    isLoading: isProfileLoading,
    isFetching,
  } = useWalletProfileQuery(wallet?.address!, {
    skip: !wallet,
  });
  const { showModal } = useModalContext();
  const [toggle, { isLoading: isToggling }] = useToggleBookmarkMutation();

  const isLoading =
    isProfileLoading || isFetching || isToggling || isWalletLoading;

  const bookmark = data?.bookmarks?.find((d) => d.endowId === endowId);
  const isBookmarked = bookmark !== undefined;

  async function toogleBookmark() {
    if (!wallet) {
      showModal(Popup, { message: "Connect wallet to edit bookmark" });
      return;
    }

    const res = await toggle({
      endowId,
      type: isBookmarked ? "delete" : "add",
      wallet: wallet.address,
    });

    if ("error" in res) {
      showModal(Popup, { message: "Failed to save bookmark" });
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
          isBookmarked || isHovered ? "text-red" : "text-white"
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
