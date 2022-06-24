import { AdmiExecuterProps } from "./types";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import Admin from "contracts/Admin";

export default function useExecuteProposal(args: AdmiExecuterProps) {
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const { wallet } = useGetWallet();
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  function executeProposal() {
    if (args.proposal_id === 0) {
      showModal(Popup, { message: "Invalid poll id" });
      return;
    }
    // TODO: think of a way to create a contract without passing too much data around
    const contract = new Admin(wallet?.provider, cwContracts, wallet?.address);
    const execMsg = contract.createExecProposalMsg(args.proposal_id);
    dispatch(
      sendTerraTx({
        msgs: [execMsg],
        tagPayloads: args.tagPayloads,
      })
    );
  }
  return { executeProposal };
}
