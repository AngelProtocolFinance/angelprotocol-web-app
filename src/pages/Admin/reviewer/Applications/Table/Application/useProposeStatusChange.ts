import { EndowmentStatusMeta } from "pages/Admin/types";
import { CharityApplication } from "types/aws";
import { EndowmentStatusNum, StatusChangePayload } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import { cleanObject } from "helpers/admin/cleanObject";
import { logStatusUpdateProposal } from "./logStatusUpdateProposal";

export default function useProposeStatusChange(app: CharityApplication) {
  const dispatch = useSetter();
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();
  const { cw3, proposalLink } = useAdminResources();

  function updateStatus(status: Extract<EndowmentStatusNum, 1 | 3>) {
    const statusChangePayload: StatusChangePayload = {
      status,
      endowment_id: app.EndowmentId,
    };
    const statusWord = status === 1 ? "Approve" : "Reject";

    const registrarContract = new Account(wallet);
    const embeddedMsg =
      registrarContract.createEmbeddedChangeEndowmentStatusMsg(
        cleanObject(statusChangePayload)
      );

    const statusUpdateMeta: EndowmentStatusMeta = {
      type: "acc_endow_status",
      data: {
        id: app.EndowmentId,
        fromStatus: "Inactive",
        toStatus: `${status}`,
      },
    };

    const contract = new CW3(wallet, cw3 /** cw3Reviewer */);
    const proposalMsg = contract.createProposalMsg(
      `${statusWord} ${app.CharityName}`,
      `registration id: ${app.PK}`,
      [embeddedMsg],
      JSON.stringify(statusUpdateMeta)
    );

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [proposalMsg],
        onSuccess(res) {
          return logStatusUpdateProposal({
            res,
            wallet: wallet!,
            proposalLink,
            PK: app.PK,
          });
        },
      })
    );

    showModal(TransactionPrompt, {});
  }

  return { updateStatus };
}
