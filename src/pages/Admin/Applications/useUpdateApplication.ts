// import { useConnectedWallet } from "@terra-money/use-wallet";
import { EndowmentStatusNum } from "services/terra/registrar/types";
import Admin from "contracts/Admin";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { StatusChangePayload } from "contracts/types";
import { useSetter } from "store/accessors";
import Registrar from "contracts/Registrar";
import cleanObject from "helpers/cleanObject";
import { EndowmentUpdateValues } from "../Templates/EndowmentUpdator/endowmentUpdateSchema";
import { sendEndowmentReviewTx } from "services/transaction/sendEndowmentReviewTx";
import { aws } from "services/aws/aws";
import { admin, tags } from "services/aws/tags";
import useWalletContext from "hooks/useWalletContext";

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
        cleanObject(statusChangePayload, [undefined])
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
            { type: tags.admin, id: admin.applications },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }

  return { updateStatus };
}
