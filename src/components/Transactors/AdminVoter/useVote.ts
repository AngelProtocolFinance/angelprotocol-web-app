import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import useEstimator from "./useEstimator";

export default function useVote() {
  const dispatch = useSetter();
  const { tx, wallet } = useEstimator();
  function vote() {
    dispatch(
      sendCosmosTx({
        wallet,
        tx: tx!,
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.admin, id: adminTags.proposal },
            { type: junoTags.admin, id: adminTags.proposals },
            { type: junoTags.admin, id: adminTags.votes },
          ]),
        ],
      })
    );
  }

  return vote;
}
