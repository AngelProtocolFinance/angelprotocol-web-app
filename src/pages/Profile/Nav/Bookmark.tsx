import { useBookmarksQuery, useToggleBookmarkMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import Popup from "components/Popup";
import { useProfile } from "..";

export default function Bookmark() {
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
  const { id, name } = useProfile();

  const bookMark = data.find((d) => d.id == id);
  const isBookMarked = bookMark !== undefined;

  async function toogleBookmark() {
    if (!wallet) {
      showModal(Popup, { message: "Connect wallet to edit bookmark" });
      return;
    }
    const res = bookMark
      ? await toggle({ type: "delete", ...bookMark, wallet: wallet.address })
      : await toggle({ type: "add", name, id, wallet: wallet.address });

    if ("error" in res) {
      showModal(Popup, { message: "Failed to save bookmark" });
    }
  }

  return (
    <button
      type="button"
      onClick={toogleBookmark}
      disabled={isLoading || isFetching || isToggling || isWalletLoading}
      className={`text-angel-orange hover:text-amber-400 disabled:text-grey-accent ${
        isToggling ? "animate-spin" : ""
      }`}
    >
      <Icon
        type={isBookMarked ? "StarFill" : "StarOutline"}
        size={20}
        title="Bookmark this endowment for faster access from your wallet dropdown menu"
      />
    </button>
  );
}
