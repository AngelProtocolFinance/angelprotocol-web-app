import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { Beneficiary } from "types/contracts";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { ADDRESS_ZERO } from "constants/evm";
import { isTooltip, useAdminContext } from "../../../../Context";

export default function useCloseEndowment() {
  const { handleSubmit } = useFormContext<FV>();
  const { multisig, txResource, id: endowId } = useAdminContext();
  const sendTx = useTxSender();

  async function closeEndowment(fv: FV) {
    if (isTooltip(txResource)) throw new Error(txResource);

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
            `registrar treasury`,
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
