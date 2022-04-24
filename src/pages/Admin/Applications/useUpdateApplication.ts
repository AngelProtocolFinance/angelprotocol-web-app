// import { useConnectedWallet } from "@terra-money/use-wallet";
import { StatusChangePayload } from "types/server/contracts";
import { EndowmentStatusNum } from "types/server/contracts";
import { adminTags, awsTags } from "types/services/aws";
import { aws } from "services/aws/aws";
import { sendEndowmentReviewTx } from "slices/transaction/transactors/sendEndowmentReviewTx";
import { useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import Admin from "contracts/Admin";
import Registrar from "contracts/Registrar";
import useWalletContext from "hooks/useWalletContext";
import cleanObject from "helpers/cleanObject";
import { EndowmentUpdateValues } from "../Templates/EndowmentUpdator/endowmentUpdateSchema";

export default function useUpdateApplicationStatus() {
  const dispatch = useSetter();
  const { wallet } = useWalletContext();
  const { showModal } = useSetModal();

  function updateStatus(data: EndowmentUpdateValues & { PK: string }) {
    const statusChangePayload: StatusChangePayload = {
      beneficiary: data.beneficiary,
      status: +data.status as EndowmentStatusNum,
      endowment_addr: data.endowmentAddr,
    };

    const registrarContract = new Registrar(wallet);
    const embeddedMsg =
      registrarContract.createEmbeddedChangeEndowmentStatusMsg(
        cleanObject(statusChangePayload)
      );

    const adminContract = new Admin("apTeam", wallet);
    const proposalMsg = adminContract.createProposalMsg(
      data.title,
      data.description,
      [embeddedMsg]
    );

    dispatch(
      sendEndowmentReviewTx({
        msgs: [proposalMsg],
        wallet,
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
