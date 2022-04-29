import { AdmiExecuterProps } from "@types-component/admin-executer";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { useGetter, useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import Admin from "contracts/Admin";
import useWalletContext from "hooks/useWalletContext";

export default function useExecuteProposal(args: AdmiExecuterProps) {
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const { wallet } = useWalletContext();
  const dispatch = useSetter();
  const { showModal } = useSetModal();

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
