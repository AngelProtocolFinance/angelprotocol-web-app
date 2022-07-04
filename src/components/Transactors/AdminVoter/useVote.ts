import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import useEstimator from "./useEstimator";

export default function useVote() {
  const dispatch = useSetter();
  const { tx, wallet } = useEstimator();
  function vote() {
    dispatch(
      sendTerraTx({
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
