import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { EndowmentStatusText } from "types/contracts";
import { Beneficiary } from "types/contracts/evm";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Prompt, { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";

export default function useUpdateStatus() {
  const { handleSubmit } = useFormContext<FV>();
  const { multisig, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const sendTx = useTxSender();
  const { showModal } = useModalContext();

  async function updateStatus({ prevStatus, status, ...fv }: FV) {
    if (prevStatus === "closed") {
      return showModal(Prompt, {
        type: "error",
        title: "Update Status",
        headline: "Endowment Closed",
        children: "Endowment is closed and can't be changed",
      });
      //only review team can change status from "Inactive"
      //NOTE: if this template will be used other than Charity: further check authority
    } else {
      if (status.value === prevStatus) {
        return showModal(Prompt, {
          type: "error",
          title: "Update Status",
          headline: "Status Unchanged",
          children: "New status same as previous status",
        });
      }
    }

    if (!wallet) {
      return showModal(TxPrompt, { error: "Wallet is not connected" });
    }

    const [beneficiary, beneficiaryMeta] = (function (): [Beneficiary, string] {
      const { id, type } = fv.beneficiary;
      switch (type) {
        case "indexfund":
          return [
            { data: { id: +id, addr: "" }, enumData: 1 },
            `index fund sdg: ${fv.id}`,
          ];
        case "endowment":
          return [
            { data: { id: +id, addr: "" }, enumData: 0 },
            `endowment id: ${fv.id}`,
          ];
        default: //wallet
          return [
            { data: { id: 0, addr: id }, enumData: 3 },
            `wallet addr: ${fv.id}`,
          ];
      }
    })();

    const [data, dest, meta] = encodeTx(
      "accounts.update-status",
      {
        id: +fv.id,
        status: toNum(status.value),
        beneficiary,
      },
      { from: prevStatus, to: status.value, beneficiary: beneficiaryMeta }
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
      tagPayloads: getTagPayloads(propMeta.willExecute && "acc_endow_status"),
    });
  }

  return { updateStatus: handleSubmit(updateStatus) };
}

const toNum = (s: EndowmentStatusText) => {
  switch (s) {
    case "inactive":
      return 0;
    case "approved":
      return 1;
    case "frozen":
      return 2;
    default: //closed
      return 3;
  }
};
