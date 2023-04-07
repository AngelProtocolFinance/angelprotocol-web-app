import { FormProps, FormValues } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";

export default function useUpdateMembers(action: FormProps["action"]) {
  const { showModal } = useModalContext();
  const { multisig, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const { sendTx, isSending } = useTxSender(true);

  async function updateMembers(fv: FormValues) {
    if (!wallet) {
      return showModal(TxPrompt, { error: "Wallet is not connected" });
    }

    const [data, dest] = encodeTx(
      action === "add" ? "multisig.add-owner" : "multisig.remove-owner",
      {
        multisig,
        address: fv.address,
      }
    );

    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig: dest,
      title: "hello world",
      description: "hahahdfas",
      destination: dest,
      value: "0",
      data,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "cw4_members"),
    });
  }

  return { updateMembers, isSending };
}
