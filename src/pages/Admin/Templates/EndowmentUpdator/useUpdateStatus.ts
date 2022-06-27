import { useFormContext } from "react-hook-form";
import { EndowmentStatusMeta, EndowmentUpdateValues } from "pages/Admin/types";
import {
  EndowmentStatus,
  EndowmentStatusNum,
  StatusChangePayload,
} from "types/server/contracts";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors/sendCosmosTx";
import Admin from "contracts/Admin";
import Registrar from "contracts/Registrar";
import cleanObject from "helpers/cleanObject";
import genProposalsLink from "../genProposalsLink";

export default function useUpdateStatus() {
  const { handleSubmit } = useFormContext<EndowmentUpdateValues>();
  const dispatch = useSetter();
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();

  function updateStatus(data: EndowmentUpdateValues) {
    if (!data.prevStatus) {
      showModal(Popup, { message: "Endowment not found" });
      return;
    } else if (data.prevStatus === "Closed") {
      showModal(Popup, { message: "Endowment is closed and can't be changed" });
    } else {
      const prevStatusNum = endowmentStatus[data.prevStatus];
      if (+data.status === prevStatusNum) {
        showModal(Popup, { message: "New status same as previous status" });
        return;
      }
    }

    const statusChangePayload: StatusChangePayload = {
      beneficiary: data.beneficiary,
      status: +data.status as EndowmentStatusNum,
      endowment_addr: data.endowmentAddr,
    };

    const registrarContract = new Registrar(wallet?.address);
    const embeddedMsg =
      registrarContract.createEmbeddedChangeEndowmentStatusMsg(
        cleanObject(statusChangePayload)
      );

    //construct endowment payload preview
    const statusUpdateMeta: EndowmentStatusMeta = {
      type: "endowment-update-status",
      data: {
        fromStatus: data.prevStatus,
        toStatus: data.status,
        beneficiary: data.beneficiary,
      },
    };

    const adminContract = new Admin("apTeam", wallet?.address);
    const proposalMsg = adminContract.createProposalMsg(
      data.title,
      data.description,
      [embeddedMsg],
      JSON.stringify(statusUpdateMeta)
    );

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [proposalMsg],
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.admin, id: adminTags.proposals },
          ]),
        ],
        successLink: genProposalsLink("apTeam"),
        successMessage: "Endowment status update proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});
  }

  return { updateStatus: handleSubmit(updateStatus) };
}

const endowmentStatus: EndowmentStatus = {
  Inactive: 0,
  Approved: 1,
  Frozen: 2,
  Closed: 3,
};
