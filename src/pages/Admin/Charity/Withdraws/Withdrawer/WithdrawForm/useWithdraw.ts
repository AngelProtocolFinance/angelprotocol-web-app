import type { BigNumber } from "@ethersproject/bignumber";
import { useFormContext } from "react-hook-form";
import { FV } from "./types";
import { AccountType, EndowmentDetails } from "types/contracts";
import { LogProcessor, SimulContractTx } from "types/evm";
import { TxOnSuccess, TxSuccessMeta } from "types/tx";
import { WithdrawMeta } from "types/tx";
import { version as v } from "services/helpers";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import { multisig as Multisig, SubmissionEvent } from "contracts/evm/multisig";
import useTxSender from "hooks/useTxSender";
import { createAuthToken, logger, scaleToStr } from "helpers";
import { ap_wallets } from "constants/ap_wallets";
import { chainIds } from "constants/chainIds";
import { EMAIL_SUPPORT } from "constants/env";
import { adminRoutes, appRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import { TxMeta, isTooltip, useAdminContext } from "../../../../Context";
import { fee, names } from "./helpers";

export default function useWithdraw() {
  const { handleSubmit, watch, getValues } = useFormContext<FV>();
  const type = watch("type");

  const { multisig, id, txResource, ...endow } = useAdminContext<"charity">([
    type === "liquid" ? "withdraw-liquid" : "withdraw-locked",
  ]);

  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  const network = watch("network");
  async function withdraw(fv: FV) {
    if (isTooltip(txResource)) throw new Error(txResource);

    const accType: AccountType = fv.type === "locked" ? 0 : 1;
    const isPolygon = fv.network === chainIds.polygon;
    const beneficiary = isPolygon
      ? fv.beneficiary
      : ap_wallets.polygon_withdraw;

    const metadata: WithdrawMeta = {
      beneficiary,
      tokens: fv.amounts.map((a) => ({
        logo: "" /** TODO: ap-justin */,
        symbol: "" /** TODO: ap-justin */,
        amount: +a.value,
      })),
    };

    const [data, dest, meta] = encodeTx(
      "accounts.withdraw",
      {
        id,
        type: accType,
        beneficiaryAddress: beneficiary,
        beneficiaryEndowId: 0, //TODO: ap-justin UI to set endow id
        tokens: fv.amounts.map((a) => ({
          addr: a.tokenId,
          amnt: scaleToStr(a.value),
        })),
      },
      {
        content: metadata,
        title: `${fv.type} withdraw `,
        description: `${fv.type} withdraw from endowment id: ${id}`,
      }
    );

    const { wallet, txMeta, isDelegated } = txResource;
    const sender = wallet.address;

    const tx: SimulContractTx = isDelegated //pertains to whitelists in this context
      ? {
          from: sender,
          to: dest,
          data,
        }
      : createTx(sender, "multisig.submit-transaction", {
          multisig: endow.owner,
          destination: dest,
          value: "0",
          data,
          meta: meta.encoded,
        });

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
        const response = await fetch(APIs.apes + `/${v(1)}/withdraw`, {
          method: "POST",
          headers: { authorization: generatedToken },
          body: JSON.stringify({
            endowment_multisig: multisig,
            proposal_chain_id: chainIds.polygon,
            target_chain: fv.network,
            target_wallet: fv.beneficiary,
            type: fv.type,
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
          success: successMeta(proposalID, txMeta, endow),
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
        log: isDelegated || isPolygon ? undefined : processLog,
      },
      ...txMeta,
      onSuccess: isPolygon
        ? undefined //no need to POST to AWS if destination is polygon
        : onSuccess,
    });
  }

  return {
    withdraw: handleSubmit(withdraw),
    fee: fee(network, getValues("fees")),
    network: names(network),
    tooltip: isTooltip(txResource) ? txResource : undefined,
  };
}

function successMeta(
  id: string | undefined,
  { willExecute }: TxMeta,
  endow: EndowmentDetails
): TxSuccessMeta {
  const DIRECT_MSG =
    "Withdraw details submitted! Funds will be sent to specified beneficiary";

  if (id === undefined /** direct */ || willExecute) {
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
