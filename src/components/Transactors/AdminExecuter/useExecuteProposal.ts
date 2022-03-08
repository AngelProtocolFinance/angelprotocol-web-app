import { useConnectedWallet } from "@terra-money/use-wallet";
import { terra } from "services/terra/terra";
import { tags, admin } from "services/terra/tags";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";
import Admin from "contracts/Admin";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { useSetter } from "store/accessors";

export default function useExecuteProposal(proposal_id: number) {
  const wallet = useConnectedWallet();
  const dispatch = useSetter();
  const { showModal } = useSetModal();

  function executeProposal() {
    if (proposal_id === 0) {
      showModal<PopupProps>(Popup, { message: "Invalid poll id" });
      return;
    }
    const contract = new Admin(wallet);
    const execMsg = contract.createExecProposalMsg(proposal_id);
    dispatch(
      sendTerraTx({
        wallet,
        msgs: [execMsg],
        tagPayloads: [
          terra.util.invalidateTags([
            //TODO: invalidate corresponding cache based on proposal executed
            { type: tags.admin, id: admin.members },
            { type: tags.admin, id: admin.member },
            { type: tags.admin, id: admin.proposal },
            { type: tags.admin, id: admin.proposals },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }
  return { executeProposal };
}
