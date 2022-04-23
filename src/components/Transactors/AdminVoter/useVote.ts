import { admin, tags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { useModalContext } from "components/ModalContext/ModalContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetter } from "store/accessors";
import useWalletContext from "hooks/useWalletContext";
import useEstimator from "./useEstimator";

export default function useVote() {
  const dispatch = useSetter();
  const { wallet } = useWalletContext();
  const tx = useEstimator();
  const { showModal } = useModalContext();
  function vote() {
    dispatch(
      sendTerraTx({
        tx: tx!,
        wallet,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.admin, id: admin.proposal },
            { type: tags.admin, id: admin.proposals },
            { type: tags.admin, id: admin.votes },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }

  return vote;
}
