import { useFormContext } from "react-hook-form";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import TransactionPromp from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import { EmbeddedWasmMsg } from "contracts/types";
import { AllianceEditValues } from "./alllianceEditSchema";
import { proposalSuccessLink } from "../constants";
import { AllianceMember as AM } from "services/terra/indexFund/types";
import useWalletContext from "hooks/useWalletContext";
import { ProposalMeta, proposalTypes } from "pages/Admin/types";

export default function useEditAlliance() {
  const { trigger, reset, getValues } = useFormContext<AllianceEditValues>();
  const { wallet } = useWalletContext();
  const { members: allianceMembers, isEditingMember } = useGetter(
    (state) => state.admin.allianceMembers
  );
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  async function editAlliance() {
    const isValid = await trigger(["description", "title"], {
      shouldFocus: true,
    });
    if (!isValid) return;

    //check if there are changes
    const markedMembers = allianceMembers.filter(
      (member) => member.isAdded || member.isDeleted || member.edits
    );

    if (markedMembers.length <= 0) {
      showModal<PopupProps>(Popup, { message: "No member changes" });
      return;
    }

    const indexFundContract = new Indexfund(wallet);

    //actual message payload
    const updateMsgs: EmbeddedWasmMsg[] = [];

    //for payload preview
    const toAddMembers: AM[] = [];
    const toRemoveMembers: AM[] = [];
    const editedMembers: AM[] = [];
    for (const member of markedMembers) {
      const { isAdded, isDeleted, edits, ...restMemberData } = member;
      if (edits) {
        updateMsgs.push(indexFundContract.createEmbeddedAAMemberEditMsg(edits));
        editedMembers.push(restMemberData);
      }
      updateMsgs.push(
        indexFundContract.createEmbeddedAAListUpdateMsg(
          restMemberData,
          isAdded ? "add" : "remove"
        )
      );
      if (isAdded) toAddMembers.push(restMemberData);
      if (isDeleted) toRemoveMembers.push(restMemberData);
    }

    const adminContract = new Admin("apTeam", wallet);

    //construct proposal meta for preview
    const editAllianceMeta: ProposalMeta = {
      type: proposalTypes.indexFund_allianceEdits,
      data: {
        toAddMembers,
        toRemoveMembers,
        editedMembers,
      },
    };

    const proposalTitle = getValues("title");
    const proposalDescription = getValues("description");

    const proposalMsg = adminContract.createProposalMsg(
      proposalTitle,
      proposalDescription,
      updateMsgs,
      JSON.stringify(editAllianceMeta)
    );

    dispatch(
      sendTerraTx({
        wallet,
        msgs: [proposalMsg],
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.admin, id: admin.proposals },
          ]),
        ],
        successLink: proposalSuccessLink,
        successMessage: "Alliance member update proposal submitted",
      })
    );
    showModal(TransactionPromp, {});
    reset();
  }

  return { editAlliance, isEditingMember };
}
