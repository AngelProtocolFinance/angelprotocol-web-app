import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { Beneficiary } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { ADDRESS_ZERO } from "constants/evm";

export default function useCloseEndowment() {
  const { handleSubmit } = useFormContext<FV>();
  const { multisig, propMeta, getWallet, id: endowId } = useAdminResources();
  const sendTx = useTxSender();

  async function closeEndowment(fv: FV) {
    const wallet = getWallet();
    if (typeof wallet === "function") return wallet();

    const [beneficiary, beneficiaryMeta] = (function (): [Beneficiary, string] {
      const { id, type } = fv.beneficiary;
      switch (type) {
        case "indexfund":
          return [
            {
              data: { fundId: +id, endowId: 0, addr: ADDRESS_ZERO },
              enumData: 1,
            },
            `index fund sdg: ${fv.beneficiary.id}`,
          ];
        case "endowment":
          return [
            {
              data: { fundId: 0, endowId: +id, addr: ADDRESS_ZERO },
              enumData: 0,
            },
            `endowment id: ${fv.beneficiary.id}`,
          ];
        default: //wallet
          return [
            { data: { fundId: 0, endowId: 0, addr: id }, enumData: 3 },
            `wallet addr: ${fv.beneficiary.id}`,
          ];
      }
    })();

    const [data, dest, meta] = encodeTx(
      "accounts.close",
      {
        id: endowId,
        beneficiary,
      },
      { beneficiary: beneficiaryMeta }
    );

    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      title: fv.title,
      description: fv.description,
      destination: dest,
      value: "0",
      data,
      meta: meta.encoded,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && meta.id),
    });
  }

  return { closeEndowment: handleSubmit(closeEndowment) };
}
