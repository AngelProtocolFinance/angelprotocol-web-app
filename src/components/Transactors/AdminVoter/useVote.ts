import { adminTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
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
            { type: terraTags.admin, id: adminTags.proposal },
            { type: terraTags.admin, id: adminTags.proposals },
            { type: terraTags.admin, id: adminTags.votes },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }

  return vote;
}
