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

const applicationsMultiSigProxy = "0x1edC050B5d84cbB0cA0b56356f3F7307efcd50Fb";
const apTeamMultiSigProxy = "0xC26Ac43b14ebCbff5029792052aF3e4DF3233902";

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
            to: applicationsMultiSigProxy,
            data:
              vote === "no"
                ? ""
                : ApplicationsMultiSig.confirmTransaction.encode(transactionId),
          }
        : {
            from: wallet.address,
            to: apTeamMultiSigProxy,
            data:
              vote === "no"
                ? ""
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
