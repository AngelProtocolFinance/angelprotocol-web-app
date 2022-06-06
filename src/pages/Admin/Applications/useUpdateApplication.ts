// import { useConnectedWallet } from "@terra-money/use-wallet";
import { EndowmentUpdateValues } from "pages/Admin/types";
import {
  EndowmentStatusNum,
  StatusChangePayload,
} from "types/server/contracts";
import { aws } from "services/aws/aws";
import { adminTags, awsTags } from "services/aws/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendEndowmentReviewTx } from "slices/transaction/transactors/sendEndowmentReviewTx";
import Admin from "contracts/Admin";
import Registrar from "contracts/Registrar";
import cleanObject from "helpers/cleanObject";

export default function useUpdateApplicationStatus() {
  const dispatch = useSetter();
  const { walletAddr, chainId, displayCoin, providerId } = useGetWallet();
  const { showModal } = useModalContext();

  function updateStatus(data: EndowmentUpdateValues & { PK: string }) {
    const statusChangePayload: StatusChangePayload = {
      beneficiary: data.beneficiary,
      status: +data.status as EndowmentStatusNum,
      endowment_addr: data.endowmentAddr,
    };

    const registrarContract = new Registrar(walletAddr);
    const embeddedMsg =
      registrarContract.createEmbeddedChangeEndowmentStatusMsg(
        cleanObject(statusChangePayload)
      );

    const adminContract = new Admin("apTeam", walletAddr);
    const proposalMsg = adminContract.createProposalMsg(
      data.title,
      data.description,
      [embeddedMsg]
    );

    dispatch(
      sendEndowmentReviewTx({
        providerId,
        walletAddr,
        chainId,
        feeBalance: displayCoin.balance,
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
