import { sendTerraTx } from "services/transaction/sendTerraTx";
import { TagPayloads } from "services/transaction/types";
import { useModalContext } from "components/ModalContext/ModalContext";
import Popup, { PopupProps } from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import Admin from "contracts/Admin";
import useWalletContext from "hooks/useWalletContext";

export default function useExecuteProposal(
  proposal_id: number,
  tagPayloads?: TagPayloads
) {
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const { wallet } = useWalletContext();
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  function executeProposal() {
    if (proposal_id === 0) {
      showModal<PopupProps>(Popup, { message: "Invalid poll id" });
      return;
    }
    const contract = new Admin(cwContracts, wallet);
    const execMsg = contract.createExecProposalMsg(proposal_id);
    dispatch(
      sendTerraTx({
        wallet,
        msgs: [execMsg],
        tagPayloads,
      })
    );
    showModal(TransactionPrompt, {});
  }
  return { executeProposal };
}
