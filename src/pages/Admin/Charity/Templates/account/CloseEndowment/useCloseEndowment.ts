import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { Beneficiary } from "types/contracts";
import { queryContract } from "services/juno/queryContract";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { ADDRESS_ZERO } from "constants/evm";
import { isTooltip, useAdminContext } from "../../../../Context";

export default function useCloseEndowment() {
  const { handleSubmit } = useFormContext<FV>();
  const { showModal } = useModalContext();
  const {
    multisig,
    txResource,
    id: endowId,
    closed: isThisEndowmentClosed,
  } = useAdminContext<"charity">();
  const sendTx = useTxSender();

  async function closeEndowment(fv: FV) {
    if (isTooltip(txResource)) throw new Error(txResource);

    if (isThisEndowmentClosed) {
      return showModal(TxPrompt, {
        error: "Endowment is already closed",
      });
    }

    if (fv.beneficiaryType === "endowment") {
      showModal(TxPrompt, { loading: "Validating beneficiary..." });
      const { endowType } = fv.meta;
      try {
        if (endowType === "charity") {
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

        if (endowType === "daf") {
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

    const [beneficiary, beneficiaryMeta] = (function (): [Beneficiary, string] {
      const { beneficiaryType, beneficiaryWallet, beneficiaryEndowmentId } = fv;
      switch (beneficiaryType) {
        case "endowment":
          return [
            {
              data: { endowId: beneficiaryEndowmentId, addr: ADDRESS_ZERO },
              enumData: 0,
            },
            `endowment id: ${beneficiaryEndowmentId}`,
          ];
        case "wallet": {
          return [
            { data: { endowId: 0, addr: beneficiaryWallet }, enumData: 1 },
            `wallet addr: ${beneficiaryWallet}`,
          ];
        }
        default:
          return [
            { data: { endowId: 0, addr: ADDRESS_ZERO }, enumData: 2 },
            "registrar treasury",
          ];
      }
    })();

    const [data, dest, meta] = encodeTx(
      "accounts.close",
      {
        id: endowId,
        beneficiary,
      },
      {
        title: fv.title,
        description: fv.description,
        content: { beneficiary: beneficiaryMeta },
      }
    );

    const { wallet, txMeta } = txResource;
    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      destination: dest,
      value: "0",
      data,
      meta: meta.encoded,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...txMeta,
      tagPayloads: getTagPayloads(txMeta.willExecute && meta.id),
    });
  }

  return {
    closeEndowment: handleSubmit(closeEndowment),
    tooltip: isTooltip(txResource) ? txResource : undefined,
  };
}
