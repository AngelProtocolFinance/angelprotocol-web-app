import { useFormContext } from "react-hook-form";
import { VoteValues } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { adminTags, customTags, junoTags } from "services/juno/tags";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import CW3 from "contracts/CW3";

export default function useVote() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<VoteValues>();
  const { cw3, wallet } = useAdminResources();
  const dispatch = useSetter();
  function vote(data: VoteValues) {
    const contract = new CW3(wallet, cw3);
    const voteMsg = contract.createVoteMsg(data.proposalId, data.vote);
    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [voteMsg],
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.custom, id: customTags.proposalDetails },
            { type: junoTags.admin, id: adminTags.proposals },
          ]),
        ],
      })
    );
  }

  return { vote: handleSubmit(vote), isSubmitting };
}
