import Prompt from "@ap/components/prompt";
import { useModalContext } from "@ap/contexts";
import { useAdminResources } from "@ap/contexts/admin";
import { useGetWallet } from "@ap/contexts/wallet-context";
import { Account, CW3 } from "@ap/contracts";
import { cleanObject } from "@ap/helpers";
import useCosmosTxSender from "@ap/hooks/use-cosmos-tx-sender";
import { getTagPayloads } from "@ap/services/juno";
import { useFormContext } from "react-hook-form";
import { EndowmentStatusMeta, EndowmentUpdateValues } from "@ap/types/admin";
import {
  Beneficiary,
  EndowmentStatus,
  EndowmentStatusNum,
  StatusChangePayload,
} from "@ap/types/contracts";

export default function useUpdateStatus() {
  const { handleSubmit } = useFormContext<EndowmentUpdateValues>();
  const { cw3, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const sendTx = useCosmosTxSender();
  const { showModal } = useModalContext();

  async function updateStatus(data: EndowmentUpdateValues) {
    if (!data.prevStatus) {
      showModal(Prompt, { children: "Endowment not found" });
      return;
    } else if (data.prevStatus === "Closed") {
      showModal(Prompt, {
        children: "Endowment is closed and can't be changed",
      });
      //only review team can change status from "Inactive"
      //NOTE: if this template will be used other than Charity: further check authority
    } else {
      const prevStatusNum = endowmentStatus[data.prevStatus];
      if (+data.status === prevStatusNum) {
        showModal(Prompt, { children: "New status same as previous status" });
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
