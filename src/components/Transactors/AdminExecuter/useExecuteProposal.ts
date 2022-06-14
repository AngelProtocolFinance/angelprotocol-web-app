import { AdmiExecuterProps } from "./types";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import Admin from "contracts/Admin";

export default function useExecuteProposal(args: AdmiExecuterProps) {
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const { walletAddr, displayCoin, providerId } = useGetWallet();
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
        providerId,
        feeBalance: displayCoin.balance,
        msgs: [execMsg],
        tagPayloads: args.tagPayloads,
      })
    );
  }
  return { executeProposal };
}
