import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { useGetWallet } from "@giving/contexts/wallet-context";
import CW3 from "@giving/contracts/CW3";
import CW3Review from "@giving/contracts/CW3/CW3Review";
import useCosmosTxSender from "@giving/hooks/useCosmosTxSender/useCosmosTxSender";
import { invalidateJunoTags } from "@giving/services/juno";
import { adminTags } from "@giving/services/juno/tags";
import { useFormContext } from "react-hook-form";
import { VoteValues as VV } from "./types";
import { useAdminResources } from "pages/Admin/Guard";

export default function useVote() {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<VV>();
  const { wallet } = useGetWallet();
  const { cw3 } = useAdminResources();
  const { sendTx, isSending } = useCosmosTxSender(true);

  async function vote({ type, proposalId, vote, reason }: VV) {
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

    await sendTx({
      msgs: [voteMsg],
      tagPayloads: [
        invalidateJunoTags([{ type: "admin", id: adminTags.proposals }]),
      ],
    });
  }

  return {
    vote: handleSubmit(vote),
    isSubmitDisabled: !isValid || isSending,
    isSending,
  };
}
