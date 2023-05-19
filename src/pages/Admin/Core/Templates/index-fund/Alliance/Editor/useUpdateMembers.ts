import { FormProps, FormValues } from "./types";
import { AllianceListUpdate } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";

export default function useUpdateMembers(action: FormProps["action"]) {
  const { propMeta, multisig, getWallet } = useAdminResources();
  const { sendTx, isSending } = useTxSender(true);

  async function updateMembers(fv: FormValues) {
    const wallet = getWallet();
    if (typeof wallet === "function") return wallet();

    const update: AllianceListUpdate = {
      address: fv.address,
      action,
    };
    const [data, dest, meta] = encodeTx(
      "index-fund.update-alliance-list",
      update,
      update
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

  return { updateMembers, isSending };
}
