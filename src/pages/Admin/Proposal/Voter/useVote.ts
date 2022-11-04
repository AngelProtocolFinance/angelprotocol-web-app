import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { useFormContext } from "react-hook-form";
import { VoteValues as VV } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { adminTags, customTags, junoTags } from "services/juno/tags";
import { useGetWallet } from "contexts/WalletContext";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import CW3 from "contracts/CW3";
import CW3Review from "contracts/CW3/CW3Review";

export default function useVote() {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<VV>();
  const { wallet } = useGetWallet();
  const { cw3 } = useAdminResources();
  const dispatch = useSetter();
  function vote({ type, proposalId, vote, reason }: VV) {
    let voteMsg: MsgExecuteContractEncodeObject;
    if (type === "application") {
      const contract = new CW3Review(wallet);
      voteMsg = contract.createVoteApplicationMsg({
        proposal_id: proposalId,
        vote: vote,
        reason: (vote === "no" && reason) || undefined,
      });
    } else {
      //normal cw3
      const contract = new CW3(wallet, cw3);
      voteMsg = contract.createVoteMsg(proposalId, vote);
    }

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

  return { vote: handleSubmit(vote), isSubmitDisabled: !isValid };
}
