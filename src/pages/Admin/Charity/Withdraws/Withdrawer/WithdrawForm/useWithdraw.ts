import type { BigNumber } from "@ethersproject/bignumber";
import { useFormContext } from "react-hook-form";
import { FV } from "./types";
import { AccountType, EndowmentDetails } from "types/contracts";
import { LogProcessor, SimulContractTx } from "types/evm";
import { AccountType as CustomAccountType } from "types/lists";
import { TxOnSuccess, TxSuccessMeta } from "types/tx";
import { WithdrawMeta } from "types/tx";
import { client } from "services/constants";
import { version as v } from "services/helpers";
import { queryContract } from "services/juno/queryContract";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import { multisig as Multisig } from "contracts/evm/multisig";
import useTxSender from "hooks/useTxSender";
import { createAuthToken, logger, scaleToStr } from "helpers";
import { getTagPayloads } from "helpers/admin";
import { apWallets } from "constants/ap-wallets";
import { chainIds } from "constants/chainIds";
import { EMAIL_SUPPORT } from "constants/env";
import { ADDRESS_ZERO } from "constants/evm";
import { adminRoutes, appRoutes } from "constants/routes";
import { tokens } from "constants/tokens";
import { APIs } from "constants/urls";
import { TxMeta, isTooltip, useAdminContext } from "../../../../Context";
import { bridgeFee, chainName } from "./helpers";

const LOG_ERROR = "error";

type WithdrawLogPayload = {
  amount: number;
  chain_id: string;
  denomination: string;
  endowment_id: number;
  endowment_multisig: string;
  proposal_id?: number; //for withdraw thru multisig
  target_chain: string;
  target_wallet: string;
  type: CustomAccountType;
};

export default function useWithdraw() {
  const { handleSubmit, watch, getValues } = useFormContext<FV>();
  const accountType = watch("accountType");
  const beneficiaryType = watch("beneficiaryType");

  const {
    multisig,
    id: endowmentId,
    txResource,
    closed,
    closingBeneficiary,
    ...endow
  } = useAdminContext<"charity">([
    accountType === "liquid" ? "withdraw-liquid" : "withdraw-locked",
  ]);

  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  const destinationChainId = watch("destinationChainId");
  async function withdraw(fv: FV) {
    if (isTooltip(txResource)) throw new Error(txResource);

    const accType: AccountType = fv.accountType === "locked" ? 0 : 1;
    const isPolygon = fv.destinationChainId === chainIds.polygon;
    const isLocked = fv.accountType === "locked";

    const beneficiary = isPolygon
      ? fv.beneficiaryWallet
      : apWallets.evmWithdraw;

    const metadata: WithdrawMeta = {
      beneficiary,
      tokens: fv.amounts.map((a) => ({
        logo: "" /** TODO: ap-justin */,
        symbol: "" /** TODO: ap-justin */,
        amount: +a.value,
      })),
    };

    // closingBenficiary always has valid value so no need to check
    if (fv.beneficiaryType === "endowment" && !fv.endowmentState.closed) {
      try {
        if (fv.endowType === "charity") {
          const beneficiaryEndowment = await queryContract(
            "accounts.endowment",
            {
              id: fv.beneficiaryEndowmentId,
            }
          );
          if (beneficiaryEndowment.endowType !== "charity") {
            return showModal(TxPrompt, {
              error: "Beneficiary must be charity",
            });
          }
          const beneficiaryEndowmentState = await queryContract(
            "accounts.state",
            {
              id: fv.beneficiaryEndowmentId,
            }
          );
          if (beneficiaryEndowmentState.closingEndowment) {
            return showModal(TxPrompt, {
              error: "Beneficiary endowment is closed.",
            });
          }
        }

        if (fv.endowType === "daf") {
          const isBeneficiaryDAF = await queryContract("accounts.is-daf", {
            id: fv.beneficiaryEndowmentId,
          });
          if (!isBeneficiaryDAF) {
            return showModal(TxPrompt, {
              error: "Benefificiary is not approved by this DAF",
            });
          }
        }
      } catch (err) {
        return showModal(TxPrompt, {
          error: "Error checking beneficiary endowment",
        });
      }
    }

    const [data, dest, meta] = encodeTx(
      "accounts.withdraw",
      {
        id: endowmentId,
        type: accType,
        beneficiaryAddress: isLocked ? ADDRESS_ZERO : beneficiary,
        beneficiaryEndowId: 0, //TODO: ap-justin UI to set endow id
        tokens: fv.amounts.map((a) => ({
          addr: a.tokenId,
          amnt: scaleToStr(a.value),
        })),
      },
      {
        content: metadata,
        title: `${fv.accountType} withdraw `,
        description: `${fv.accountType} withdraw from endowment id: ${endowmentId}`,
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

    //only used when liquid && !isPolygon && !isDirect
    const processLog: LogProcessor = (logs) => {
      const submissionTopic = Multisig.getEventTopic("TransactionSubmitted");
      const log = logs.find((l) => l.topics.includes(submissionTopic));
      if (!log) return LOG_ERROR;

      const [, , proposalId] = Multisig.decodeEventLog(
        "TransactionSubmitted",
        log.data,
        log.topics
      );

      return (proposalId as BigNumber).toNumber();
    };

    //only ran when liquid &&  !isPolygon
    const onSuccess: TxOnSuccess = async ({ data, ...tx }) => {
      try {
        const proposalID = data as
          | number
          | undefined /** no log processor is passed (DIRECT withdraw )*/
          | typeof LOG_ERROR; /** log processor is passed but failed get log */

        if (proposalID === LOG_ERROR) {
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

        const payload: WithdrawLogPayload = {
          /**
           * NOTE: endpoint only accepts single value, but contract allows multiple.
           * how to handle multiple coins, and corresponding bridge fees
           */
          amount: +fv.amounts[0].value,
          chain_id: wallet.chain.chain_id,
          denomination: tokens[fv.amounts[0].tokenId].symbol,
          endowment_id: endowmentId,
          endowment_multisig: multisig,
          target_chain: fv.destinationChainId,
          target_wallet: fv.beneficiaryWallet,
          type: fv.accountType,
          /** undefined proposalID means withdraw is direct */
          ...(proposalID ? { proposal_id: proposalID } : {}),
        };

        const generatedToken = createAuthToken("angelprotocol-web-app");
        const response = await fetch(
          APIs.apes + `/${v(3)}/withdraw/${client}`,
          {
            method: "POST",
            headers: { authorization: generatedToken },
            body: JSON.stringify(payload),
          }
        );

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
        log: isLocked || isDelegated || isPolygon ? undefined : processLog,
      },
      ...txMeta,
      onSuccess:
        isLocked || isPolygon
          ? undefined //no need to POST to AWS if destination is polygon
          : onSuccess,
      tagPayloads: getTagPayloads(txMeta.willExecute && meta.id),
    });
  }

  return {
    withdraw: handleSubmit(withdraw),
    bridgeFee: bridgeFee(destinationChainId, getValues("bridgeFees")),
    chainName: chainName(destinationChainId),
    tooltip: isTooltip(txResource) ? txResource : undefined,
    beneficiaryType,
    accountType,
    endowmentType: getValues("endowType"),
    closed,
    closingBeneficiary,
  };
}

function successMeta(
  id: number | undefined,
  { willExecute }: TxMeta,
  endow: EndowmentDetails
): TxSuccessMeta {
  const DIRECT_MSG =
    "Withdraw details submitted! Funds will be sent to specified beneficiary";

  if (id === undefined /** direct */ || willExecute) {
    return { message: DIRECT_MSG };
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
