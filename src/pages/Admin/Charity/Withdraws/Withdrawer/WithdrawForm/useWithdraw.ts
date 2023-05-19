import type { BigNumber } from "@ethersproject/bignumber";
import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { PropMeta } from "services/types";
import { EndowmentDetails } from "types/contracts";
import { LogProcessor } from "types/evm";
import { TxOnSuccess, TxSuccessMeta } from "types/tx";
import { useAdminResources } from "pages/Admin/Guard";
import { AP_ID } from "services/juno/custom";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { multisig as Multisig, SubmissionEvent } from "contracts/evm/multisig";
import useTxSender from "hooks/useTxSender";
import { createAuthToken, logger } from "helpers";
import { chainIds } from "constants/chainIds";
import { EMAIL_SUPPORT } from "constants/common";
import { adminRoutes, appRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import { constructTx } from "./constructTx";

export default function useWithdraw() {
  const { handleSubmit } = useFormContext<WithdrawValues>();

  const { multisig, id, propMeta, getWallet, ...endow } =
    useAdminResources<"charity">();
  const { showModal } = useModalContext();

  const sendTx = useTxSender();

  async function withdraw(wv: WithdrawValues) {
    const wallet = getWallet();
    if (typeof wallet === "function") return wallet();

    const { tx, isDirect, isPolygon } = constructTx(
      wallet.address,
      id,
      endow,
      wv
    );

    //only used when !isPolygon && !isDirect
    const processLog: LogProcessor = (logs) => {
      const submissionTopic = Multisig.getEventTopic(SubmissionEvent);
      const log = logs.find((l) => l.topics.includes(submissionTopic));
      if (!log) return null;

      const [id] = Multisig.decodeEventLog(
        SubmissionEvent,
        log.data,
        log.topics
      );
      return (id as BigNumber).toString();
    };

    //only ran when !isPolygon
    const onSuccess: TxOnSuccess = async ({ data, ...tx }) => {
      try {
        const proposalID = data as
          | undefined /** no log processor is passed (DIRECT withdraw )*/
          | null; /** log processor is passed but failed get log */

        if (proposalID === null) {
          return showModal(TxPrompt, {
            error: "Error: failed to save withdraw proposal id",
            tx,
          });
        }

        showModal(
          TxPrompt,
          { loading: "Saving withdraw details" },
          { isDismissible: false }
        );

        const generatedToken = createAuthToken("angelprotocol-web-app");
        const response = await fetch(APIs.apes + "/v1/withdraw", {
          method: "POST",
          headers: { authorization: generatedToken },
          body: JSON.stringify({
            endowment_multisig: multisig,
            proposal_chain_id: chainIds.polygon,
            target_chain: wv.network,
            target_wallet: wv.beneficiary,
            type: wv.type,
            /** undefined proposalID means withdraw is direct */
            ...(proposalID ? { proposal_id: proposalID } : {}),
          }),
        });

        if (!response.ok) {
          return showModal(TxPrompt, {
            error: `Failed to save withdraw details. Contact ${EMAIL_SUPPORT}`,
          });
        }

        showModal(TxPrompt, {
          success: successMeta(proposalID, wv, propMeta, endow),
          tx,
        });
      } catch (err) {
        logger.error(err);
        showModal(TxPrompt, {
          error: `Failed to save withdraw details. Contact ${EMAIL_SUPPORT}`,
          tx,
        });
      }
    };

    await sendTx({
      content: {
        type: "evm",
        val: tx,
        log: isDirect || isPolygon ? undefined : processLog,
      },
      ...propMeta,
      isAuthorized:
        propMeta.isAuthorized ||
        isDirect /** if whitelisted, could send this tx */,
      onSuccess: isPolygon
        ? undefined //no need to POST to AWS if destination is polygon
        : onSuccess,
    });
  }

  return handleSubmit(withdraw);
}

function successMeta(
  id: string | undefined,
  wv: WithdrawValues,
  { willExecute }: PropMeta,
  endow: EndowmentDetails
): TxSuccessMeta {
  const DIRECT_MSG =
    "Withdraw details submitted! Funds will be sent to specified beneficiary";

  if (id === undefined /** direct */) {
    return {
      message: DIRECT_MSG,
    };
  }

  if (willExecute) {
    if (endow.endow_type === "charity" && wv.type === "locked") {
      return {
        message: "Withdraw proposal submitted for AP Team approval",
        link: {
          description: "View proposal",
          url: `${appRoutes.admin}/${AP_ID}/${adminRoutes.proposal}/${id}`,
        },
      };
    }
    /** rest is directed to accounts contract*/
    return {
      message: DIRECT_MSG,
    };
  }

  return {
    message:
      "Withdraw proposal created! Upon approval, funds will be sent to specified beneficiary",
    link: {
      description: "View proposal",
      url: `${appRoutes.admin}/${endow.owner}/${adminRoutes.proposal}/${id}`,
    },
  };
}
