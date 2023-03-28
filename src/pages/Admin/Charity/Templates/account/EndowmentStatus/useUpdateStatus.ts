import { useFormContext } from "react-hook-form";
import { EndowmentStatusMeta, EndowmentUpdateValues } from "pages/Admin/types";
import {
  Beneficiary,
  EndowmentStatus,
  EndowmentStatusNum,
  StatusChangePayload,
} from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Prompt from "components/Prompt";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { cleanObject } from "helpers/cleanObject";

export default function useUpdateStatus() {
  const { handleSubmit } = useFormContext<EndowmentUpdateValues>();
  const { cw3, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const sendTx = useTxSender();
  const { showModal } = useModalContext();

  async function updateStatus(data: EndowmentUpdateValues) {
    if (!data.prevStatus) {
      return showModal(Prompt, {
        type: "error",
        title: "Update Status",
        headline: "Endowment not found",
      });
    } else if (data.prevStatus === "closed") {
      return showModal(Prompt, {
        type: "error",
        title: "Update Status",
        headline: "Endowment Closed",
        children: "Endowment is closed and can't be changed",
      });
      //only review team can change status from "Inactive"
      //NOTE: if this template will be used other than Charity: further check authority
    } else {
      const prevStatusNum = endowmentStatus[data.prevStatus];
      if (+data.status === prevStatusNum) {
        return showModal(Prompt, {
          type: "error",
          title: "Update Status",
          headline: "Status Unchanged",
          children: "New status same as previous status",
        });
      }
    }

    const [beneficiary, beneficiaryMeta] = (function (): [Beneficiary, string] {
      switch (data.beneficiaryType) {
        case "index fund":
          return [
            { indexfund: { id: data.indexFund } },
            `index fund sdg: ${data.indexFund}`,
          ];
        case "endowment":
          return [
            { endowment: { id: data.endowmentId } },
            `endowment id: ${data.endowmentId}`,
          ];
        default:
          return [
            { wallet: { address: data.wallet } },
            `wallet addr: ${data.wallet}`,
          ];
      }
    })();

    const statusChangePayload: StatusChangePayload = {
      beneficiary,
      status: +data.status as EndowmentStatusNum,
      endowment_id: data.id,
    };

    const accountContract = new Account(wallet);
    const embeddedMsg = accountContract.createEmbeddedChangeEndowmentStatusMsg(
      cleanObject(statusChangePayload)
    );

    //construct endowment payload preview
    const statusUpdateMeta: EndowmentStatusMeta = {
      type: "acc_endow_status",
      data: {
        id: data.id,
        fromStatus: data.prevStatus,
        toStatus: data.status,
        beneficiary: beneficiaryMeta,
      },
    };

    const adminContract = new CW3(wallet, cw3);
    const proposalMsg = adminContract.createProposalMsg(
      data.title,
      data.description,
      [embeddedMsg],
      JSON.stringify(statusUpdateMeta)
    );

    await sendTx({
      content: { type: "cosmos", val: [proposalMsg] },
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "acc_endow_status"),
    });
  }

  return { updateStatus: handleSubmit(updateStatus) };
}

const endowmentStatus: EndowmentStatus = {
  inactive: 0,
  approved: 1,
  frozen: 2,
  closed: 3,
};
