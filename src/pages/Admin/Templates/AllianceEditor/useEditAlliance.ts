import { useFormContext } from "react-hook-form";
import { AllianceEditMeta, AllianceEditValues } from "pages/Admin/types";
import { AllianceMember as AM, EmbeddedWasmMsg } from "types/server/contracts";
import { adminTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPromp from "components/Transactor/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import genProposalsLink from "../genProposalsLink";

export default function useEditAlliance() {
  const { trigger, reset, getValues } = useFormContext<AllianceEditValues>();
  const { wallet } = useGetWallet();
  const { members: allianceMembers, isEditingMember } = useGetter(
    (state) => state.admin.allianceMembers
  );
  const { showModal } = useModalContext();
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
      showModal(Popup, { message: "No member changes" });
      return;
    }

    const indexFundContract = new Indexfund(wallet?.address);

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

    const adminContract = new Admin("apTeam", wallet?.address);

    //construct proposal meta for preview
    const editAllianceMeta: AllianceEditMeta = {
      type: "indexfund-alliance-edit",
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
            { type: terraTags.admin, id: adminTags.proposals },
          ]),
        ],
        successLink: genProposalsLink("apTeam"),
        successMessage: "Alliance member update proposal submitted",
      })
    );
    showModal(TransactionPromp, {});
    reset();
  }

  return { editAlliance, isEditingMember };
}
