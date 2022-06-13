import { adminTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useModalContext } from "contexts/ModalContext";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import useEstimator from "./useEstimator";

export default function useVote() {
  const dispatch = useSetter();
  const { tx, providerId } = useEstimator();
  const { showModal } = useModalContext();
  function vote() {
    dispatch(
      sendTerraTx({
        providerId,
        tx: tx!,
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
