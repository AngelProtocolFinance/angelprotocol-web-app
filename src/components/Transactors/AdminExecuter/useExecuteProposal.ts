import { AdmiExecuterProps } from "./types";
import { useModalContext } from "contexts/ModalContext";
import {
  useGetWallet,
  useSetWallet,
} from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import Admin from "contracts/Admin";

export default function useExecuteProposal(args: AdmiExecuterProps) {
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const { walletAddr } = useGetWallet();
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  function executeProposal() {
    if (args.proposal_id === 0) {
      showModal(Popup, { message: "Invalid poll id" });
      return;
    }
    const contract = new Admin(cwContracts, walletAddr);
    const execMsg = contract.createExecProposalMsg(args.proposal_id);
    dispatch(
      sendTerraTx({
        msgs: [execMsg],
        tagPayloads: args.tagPayloads,
      })
    );
    showModal(TransactionPrompt, {});
  }
  return { executeProposal };
}
