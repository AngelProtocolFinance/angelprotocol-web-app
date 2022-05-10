import { AdmiExecuterProps } from "@types-component/admin-executer";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import Admin from "contracts/Admin";
import useWalletContext from "hooks/useWalletContext";

export default function useExecuteProposal(args: AdmiExecuterProps) {
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const { wallet } = useWalletContext();
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  function executeProposal() {
    if (args.proposal_id === 0) {
      showModal(Popup, { message: "Invalid poll id" });
      return;
    }
    const contract = new Admin(cwContracts, wallet);
    const execMsg = contract.createExecProposalMsg(args.proposal_id);
    dispatch(
      sendTerraTx({
        wallet,
        msgs: [execMsg],
        tagPayloads: args.tagPayloads,
      })
    );
    showModal(TransactionPrompt, {});
  }
  return { executeProposal };
}
