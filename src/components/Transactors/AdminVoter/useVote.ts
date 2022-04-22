import { adminTags, terraTags } from "types/services/terra";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import useWalletContext from "hooks/useWalletContext";
import useEstimator from "./useEstimator";

export default function useVote() {
  const dispatch = useSetter();
  const { wallet } = useWalletContext();
  const tx = useEstimator();
  const { showModal } = useSetModal();
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
