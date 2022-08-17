import { EndowmentUpdateValues } from "pages/Admin/types";
import {
  EndowmentStatusNum,
  StatusChangePayload,
} from "types/server/contracts";
import cleanObject from "pages/Admin/helpers/cleanObject";
import { aws } from "services/aws/aws";
import { adminTags, awsTags } from "services/aws/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendEndowmentReviewTx } from "slices/transaction/transactors";
import CW3 from "contracts/CW3";
import Registrar from "contracts/Registrar";

export default function useUpdateApplicationStatus() {
  const dispatch = useSetter();
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();

  function updateStatus(data: EndowmentUpdateValues & { PK: string }) {
    const statusChangePayload: StatusChangePayload = {
      beneficiary: data.beneficiary,
      status: +data.status as EndowmentStatusNum,
      endowment_id: data.id,
    };

    const registrarContract = new Registrar(wallet);
    const embeddedMsg =
      registrarContract.createEmbeddedChangeEndowmentStatusMsg(
        cleanObject(statusChangePayload)
      );

    const contract = new CW3(wallet, "" /**TODO: make this work */);
    const proposalMsg = contract.createProposalMsg(
      data.title,
      data.description,
      [embeddedMsg]
    );

    dispatch(
      sendEndowmentReviewTx({
        wallet,
        msgs: [proposalMsg],
        applicationId: data.PK,
        tagPayloads: [
          aws.util.invalidateTags([
            { type: awsTags.admin, id: adminTags.applications },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }

  return { updateStatus };
}
