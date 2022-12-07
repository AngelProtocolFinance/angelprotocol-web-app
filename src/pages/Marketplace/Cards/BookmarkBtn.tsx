import { PropsWithChildren, useState } from "react";
import { useBookmarksQuery, useToggleBookmarkMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import Popup from "components/Popup";

type Props = PropsWithChildren<{
  id: number;
  name: string;
  logo: string;
}>;

export default function BookmarkBtn({ id, name, logo, children }: Props) {
  const [isHovered, setHovered] = useState(false);

  const { wallet, isLoading: isWalletLoading } = useGetWallet();
  const {
    data = [],
    isLoading,
    isFetching,
  } = useBookmarksQuery(wallet?.address!, {
    skip: !wallet,
  });
  const { showModal } = useModalContext();
  const [toggle, { isLoading: isToggling }] = useToggleBookmarkMutation();

  const bookMark = data.find((d) => d.id === id);
  const isBookMarked = bookMark !== undefined;

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
    <button
      type="button"
      onClick={toogleBookmark}
      disabled={isLoading || isFetching || isToggling || isWalletLoading}
      className={`flex items-center gap-1 ${
        isBookMarked || isHovered ? "text-red" : "text-white"
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
          isToggling
            ? "Loading"
            : isBookMarked || isHovered
            ? "HeartFill"
            : "HeartOutline"
        }
        className={isToggling ? "animate-spin" : ""}
        size={20}
        title="Favorite this endowment for faster access from your wallet dropdown menu"
      />
      {children}
    </button>
  );
}
