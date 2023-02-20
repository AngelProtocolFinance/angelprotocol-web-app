import { useAdminResources } from "@ap/contexts/admin";
import { useGetWallet } from "@ap/contexts/wallet-context";
import { CW3, CW3Review } from "@ap/contracts";
import useCosmosTxSender from "@ap/hooks/use-cosmos-tx-sender";
import { adminTags, invalidateJunoTags } from "@ap/services/juno";
import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { useFormContext } from "react-hook-form";
import { VoteValues as VV } from "./types";

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
