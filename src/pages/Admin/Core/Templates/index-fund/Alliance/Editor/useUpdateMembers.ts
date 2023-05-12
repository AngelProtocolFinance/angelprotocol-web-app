import { FormProps, FormValues } from "./types";
import { AllianceListUpdate } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";

export default function useUpdateMembers(action: FormProps["action"]) {
  const { showModal } = useModalContext();
  const { propMeta, multisig } = useAdminResources();
  const { wallet } = useGetWallet();
  const { sendTx, isSending } = useTxSender(true);

  async function updateMembers(fv: FormValues) {
    if (!wallet) {
      return showModal(TxPrompt, { error: "Wallet is not connected" });
    }

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
      tagPayloads: getTagPayloads(propMeta.willExecute && "cw4_members"),
    });
  }

  return { updateMembers, isSending };
}
