import { useConnectedWallet } from "@terra-money/use-wallet";
import { useFormContext } from "react-hook-form";
import { ProposalMeta, proposalTypes } from "pages/Admin/types";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import {
  EndowmentStatus,
  EndowmentStatusNum,
} from "services/terra/registrar/types";
import { terra } from "services/terra/terra";
import { tags, admin } from "services/terra/tags";
import Admin from "contracts/Admin";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import { StatusChangePayload } from "contracts/types";
import { useSetter } from "store/accessors";
import Registrar from "contracts/Registrar";
import cleanObject from "helpers/cleanObject";
import { proposalSuccessLink } from "../constants";
import { EndowmentUpdateValues } from "./endowmentUpdateSchema";

export default function useUpdateStatus() {
  const { handleSubmit } = useFormContext<EndowmentUpdateValues>();
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();

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

    const registrarContract = new Registrar(wallet);
    const embeddedMsg =
      registrarContract.createEmbeddedChangeEndowmentStatusMsg(
        cleanObject(statusChangePayload, [undefined])
      );

    //construct endowment payload preview
    const statusUpdateMeta: ProposalMeta = {
      type: proposalTypes.endowment_updateStatus,
      data: {
        fromStatus: data.prevStatus,
        toStatus: data.status,
        beneficiary: data.beneficiary,
      },
    };

    const adminContract = new Admin("apTeam", wallet);
    const proposalMsg = adminContract.createProposalMsg(
      data.title,
      data.description,
      [embeddedMsg],
      JSON.stringify(statusUpdateMeta)
    );

    dispatch(
      sendTerraTx({
        msgs: [proposalMsg],
        wallet,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.admin, id: admin.proposals },
          ]),
        ],
        successLink: proposalSuccessLink,
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
