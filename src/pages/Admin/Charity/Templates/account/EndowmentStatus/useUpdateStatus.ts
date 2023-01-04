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
import Popup from "components/Popup";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import useCosmosTxSender from "hooks/useCosmosTxSender/useCosmosTxSender";
import { cleanObject, getTagPayloads } from "helpers/admin";

export default function useUpdateStatus() {
  const { handleSubmit } = useFormContext<EndowmentUpdateValues>();
  const { cw3, role, propMeta, wallet } = useAdminResources();
  const sendTx = useCosmosTxSender();
  const { showModal } = useModalContext();

  async function updateStatus(data: EndowmentUpdateValues) {
    if (!data.prevStatus) {
      showModal(Popup, { message: "Endowment not found" });
      return;
    } else if (data.prevStatus === "Closed") {
      showModal(Popup, { message: "Endowment is closed and can't be changed" });
      //only review team can change status from "Inactive"
    } else if (data.prevStatus === "Inactive" && role === "ap") {
      showModal(Popup, {
        message: "This group is not authorized to change Inactive endowments",
      });
      return;
    } else {
      const prevStatusNum = endowmentStatus[data.prevStatus];
      if (+data.status === prevStatusNum) {
        showModal(Popup, { message: "New status same as previous status" });
        return;
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
      msgs: [proposalMsg],
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "acc_endow_status"),
    });
  }

  return { updateStatus: handleSubmit(updateStatus) };
}

const endowmentStatus: EndowmentStatus = {
  Inactive: 0,
  Approved: 1,
  Frozen: 2,
  Closed: 3,
};
