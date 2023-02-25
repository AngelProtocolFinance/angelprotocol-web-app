import Popup from "@giving/components/Popup";
import { useModalContext } from "@giving/contexts/modal-context";
import { useGetWallet } from "@giving/contexts/wallet-context";
import useCosmosTxSender from "@giving/hooks/useCosmosTxSender/useCosmosTxSender";
import { useFormContext } from "react-hook-form";
import { AllianceMember as AM, EmbeddedWasmMsg } from "@giving/types/contracts";
import {
  AllianceEditMeta,
  AllianceEditValues,
} from "@giving/types/pages/admin";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetter } from "store/accessors";
import CW3 from "contracts/CW3";
import IndexFund from "contracts/IndexFund";

export default function useEditAlliance() {
  const { trigger, reset, getValues } = useFormContext<AllianceEditValues>();
  const { cw3, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const { members: allianceMembers, isEditingMember } = useGetter(
    (state) => state.admin.allianceMembers
  );
  const { showModal } = useModalContext();
  const sendTx = useCosmosTxSender();

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

    const indexFundContract = new IndexFund(wallet);

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

    const adminContract = new CW3(wallet, cw3);

    //construct proposal meta for preview
    const editAllianceMeta: AllianceEditMeta = {
      type: "if_alliance",
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

    await sendTx({
      msgs: [proposalMsg],
      ...propMeta,
    });
    reset();
  }

  return { editAlliance, isEditingMember };
}
