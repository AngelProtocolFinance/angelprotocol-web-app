import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useSetter } from "store/accessors";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { useSetModal } from "components/Modal/Modal";
import useEstimator from "./useEstimator";

export default function useVote() {
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const tx = useEstimator();
  const { showModal } = useSetModal();
  function vote() {
    dispatch(
      sendTerraTx({
        tx: tx!,
        wallet,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.admin, id: admin.proposal },
            { type: tags.admin, id: admin.votes },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }

  return vote;
}
