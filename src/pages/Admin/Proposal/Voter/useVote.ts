import { useFormContext } from "react-hook-form";
import { VoteValues as VV } from "./types";
import { SimulContractTx } from "types/evm";
import { invalidateJunoTags } from "services/juno";
import { adminTags } from "services/juno/tags";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetWallet } from "contexts/WalletContext";
import { APTeamMultiSig, ApplicationsMultiSig } from "contracts/evm";
import useTxSender from "hooks/useTxSender";
import { WalletDisconnectedError } from "errors/errors";
import { polygonContracts } from "constants/contracts";

export default function useVote() {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<VV>();
  const { wallet } = useGetWallet();
  const { sendTx, isSending } = useTxSender(true);
  const { handleError } = useErrorContext();

  async function vote({ type, proposalId: transactionId, vote }: VV) {
    if (!wallet) {
      return handleError(new WalletDisconnectedError());
    }

    const voteMsg: SimulContractTx =
      type === "application"
        ? {
            from: wallet.address,
            to: polygonContracts.multiSig.ApplicationsMultiSigProxy,
            data:
              vote === "no"
                ? ApplicationsMultiSig.revokeTransaction.encode(transactionId)
                : ApplicationsMultiSig.confirmTransaction.encode(transactionId),
          }
        : {
            from: wallet.address,
            to: polygonContracts.multiSig.APTeamMultiSigProxy,
            data:
              vote === "no"
                ? APTeamMultiSig.revokeTransaction.encode(transactionId)
                : APTeamMultiSig.confirmTransaction.encode(transactionId),
          };

    await sendTx({
      content: { type: "evm", val: voteMsg },
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
