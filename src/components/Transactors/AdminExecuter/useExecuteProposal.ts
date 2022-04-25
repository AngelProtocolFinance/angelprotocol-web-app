import { adminTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { useGetter, useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import Admin from "contracts/Admin";
import useWalletContext from "hooks/useWalletContext";

export default function useExecuteProposal(proposal_id: number) {
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const { wallet } = useWalletContext();
  const dispatch = useSetter();
  const { showModal } = useSetModal();

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
        tagPayloads: [
          terra.util.invalidateTags([
            //TODO: invalidate corresponding cache based on proposal executed
            { type: terraTags.admin, id: adminTags.members },
            { type: terraTags.admin, id: adminTags.member },
            { type: terraTags.admin, id: adminTags.proposal },
            { type: terraTags.admin, id: adminTags.proposals },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }
  return { executeProposal };
}
