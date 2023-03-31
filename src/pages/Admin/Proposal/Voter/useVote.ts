import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { useFormContext } from "react-hook-form";
import { VoteValues as VV } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { useGetWallet } from "contexts/WalletContext";
import CW3 from "contracts/CW3";
import CW3Review from "contracts/CW3/CW3Review";
import useTxSender from "hooks/useTxSender";

export default function useVote() {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<VV>();
  const { wallet } = useGetWallet();
  const { multisig } = useAdminResources();
  const { sendTx, isSending } = useTxSender(true);

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
      const contract = new CW3(wallet, multisig);
      voteMsg = contract.createVoteMsg(proposalId, vote);
    }

    await sendTx({
      content: { type: "cosmos", val: [voteMsg] },
      tagPayloads: [invalidateJunoTags(["multisig.proposals"])],
    });
  }

  return {
    vote: handleSubmit(vote),
    isSubmitDisabled: !isValid || isSending,
    isSending,
  };
}
