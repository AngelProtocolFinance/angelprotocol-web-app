import { AccountType } from "types/contracts";
import { invalidateApesTags } from "services/apes";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { useSetter } from "store/accessors";
import { TxOnSuccess, TxSuccessMeta } from "hooks/useCosmosTxSender";
import {
  createAuthToken,
  getWasmAttribute,
  idParamToNum,
  logger,
} from "helpers";
import { EMAIL_SUPPORT } from "constants/common";
import { APIs } from "constants/urls";

type ProposalInfo = {
  endowment_multisig: string;
  proposal_chain_id: string;
  target_chain: string;
  target_wallet: string;
  type: AccountType;
};

export default function useLogWithdrawProposal(successMeta?: TxSuccessMeta) {
  const { showModal } = useModalContext();
  const dispatch = useSetter();

  async function logWithdrawProposal(
    info: ProposalInfo,
    ...[res, chainId]: Parameters<TxOnSuccess>
  ) {
    try {
      showModal(
        TxPrompt,
        { loading: "Saving proposal informatin" },
        { isDismissible: false }
      );

      const parsedId = getWasmAttribute("proposal_id", res.logs);
      const numId = idParamToNum(parsedId);

      if (numId === 0) throw new Error("Failed to get proposal id");
      const generatedToken = createAuthToken("angelprotocol-web-app");
      const response = await fetch(APIs.apes + "/v1/withdraw", {
        method: "POST",
        headers: { authorization: generatedToken },
        body: JSON.stringify({ ...info, proposal_id: numId }),
      });

      if (!response.ok) {
        return showModal(TxPrompt, {
          error: `Failed to log created withdraw proposal. Contact ${EMAIL_SUPPORT}`,
        });
      }

      showModal(TxPrompt, {
        success: successMeta || { message: "Withdraw proposal submitted" },
        tx: { hash: res.txhash, chainId },
      });

      dispatch(invalidateApesTags(["withdraw_logs"]));
    } catch (err) {
      logger.error(err);
      showModal(TxPrompt, {
        error: `Failed to log created withdraw proposal. Contact ${EMAIL_SUPPORT}`,
      });
    }
  }

  return logWithdrawProposal;
}
