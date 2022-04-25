import { terraTags, userTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import Halo from "contracts/Halo";
import useWalletContext from "hooks/useWalletContext";

export default function useEndPoll(pollId: number) {
  const { wallet } = useWalletContext();
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  function endPoll() {
    if (pollId === 0) {
      showModal(Popup, { message: "Poll is invalid" });
      return;
    }

    const contract = new Halo(wallet);
    const msg = contract.createEndPollMsg(pollId);

    dispatch(
      sendTerraTx({
        wallet,
        msgs: [msg],
        tagPayloads: [
          terra.util.invalidateTags([
            { type: terraTags.gov },
            { type: terraTags.user, id: userTags.halo_balance },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }

  return { endPoll };
}
