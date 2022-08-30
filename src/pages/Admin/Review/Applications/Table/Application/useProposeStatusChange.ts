import { EndowmentStatusMeta } from "pages/Admin/types";
import { CharityApplication } from "types/aws";
import { EndowmentStatusNum, StatusChangePayload } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import CW3 from "contracts/CW3";
import Registrar from "contracts/Registrar";
import { cleanObject } from "helpers/admin/cleanObject";
import { logStatusUpdateProposal } from "./logStatusUpdateProposal";

const NUM_ID = 15; //TODO: get this from ap (not yet present)
export default function useProposeStatusChange(app: CharityApplication) {
  const dispatch = useSetter();
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();
  const { cw3, proposalLink } = useAdminResources();

  function updateStatus(status: Extract<EndowmentStatusNum, 1 | 3>) {
    const statusChangePayload: StatusChangePayload = {
      status,
      endowment_id: NUM_ID,
    };
    const statusWord = status === 1 ? "Approve" : "Reject";

    const registrarContract = new Registrar(wallet);
    const embeddedMsg =
      registrarContract.createEmbeddedChangeEndowmentStatusMsg(
        cleanObject(statusChangePayload)
      );

    const statusUpdateMeta: EndowmentStatusMeta = {
      type: "reg_endow_status",
      data: {
        id: NUM_ID,
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
