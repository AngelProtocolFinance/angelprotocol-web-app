import { PropsWithChildren, useRef, useState } from "react";
import { useBookmarksQuery, useToggleBookmarkMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import Popup from "components/Popup";
import Tooltip from "components/Tooltip";

type Props = PropsWithChildren<{
  id: number;
  name: string;
  logo: string;
}>;

export default function BookmarkBtn({ id, name, logo, children }: Props) {
  const [isHovered, setHovered] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const { wallet, isLoading: isWalletLoading } = useGetWallet();
  const {
    data,
    isLoading: isProfileLoading,
    isFetching,
  } = useBookmarksQuery(wallet?.address!, {
    skip: !wallet,
  });
  const { showModal } = useModalContext();
  const [toggle, { isLoading: isToggling }] = useToggleBookmarkMutation();

  const isLoading =
    isProfileLoading || isFetching || isToggling || isWalletLoading;

  const bookMark = data?.endowments?.find((d) => d.id === id);
  const isBookmarked = bookMark !== undefined;

  async function toogleBookmark() {
    if (!wallet) {
      showModal(Popup, { message: "Connect wallet to edit bookmark" });
      return;
    }
    const res = bookMark
      ? await toggle({ type: "delete", ...bookMark, wallet: wallet.address })
      : await toggle({ type: "add", name, id, logo, wallet: wallet.address });

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
