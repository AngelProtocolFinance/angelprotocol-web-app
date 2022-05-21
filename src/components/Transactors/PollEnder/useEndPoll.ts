import { multicallTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import Gov from "contracts/Gov";
import useWalletContext from "hooks/useWalletContext";

export default function useEndPoll(pollId: number) {
  const { wallet } = useWalletContext();
  const { showModal } = useModalContext();
  const dispatch = useSetter();

  function endPoll() {
    if (pollId === 0) {
      showModal(Popup, { message: "Poll is invalid" });
      return;
    }

    const contract = new Gov(wallet);
    const msg = contract.createEndPollMsg(pollId);

    dispatch(
      sendTerraTx({
        wallet,
        msgs: [msg],
        tagPayloads: [
          terra.util.invalidateTags([
            { type: terraTags.gov },
            { type: terraTags.multicall, id: multicallTags.terraBalances },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }

  return { endPoll };
}
