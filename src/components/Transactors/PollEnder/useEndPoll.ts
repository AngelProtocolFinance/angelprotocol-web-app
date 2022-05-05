import { multicall, tags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetter } from "store/accessors";
import Gov from "contracts/Gov";
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

    const contract = new Gov(wallet);
    const msg = contract.createEndPollMsg(pollId);

    dispatch(
      sendTerraTx({
        wallet,
        msgs: [msg],
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.gov },
            { type: tags.multicall, id: multicall.terraBalances },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }

  return { endPoll };
}
