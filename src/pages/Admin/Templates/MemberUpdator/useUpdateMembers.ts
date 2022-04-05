import { useFormContext } from "react-hook-form";
import { Member } from "services/terra/admin/types";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import TransactionPromp from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import Admin from "contracts/Admin";
import { MemberUpdatorValues } from "./memberUpdatorSchema";
import genProposalsLink from "../genProposalsLink";
import { useParams } from "react-router-dom";
import { EndowmentAddrParams } from "pages/EndowmentAdmin/types";
import { ProposalMeta, proposalTypes } from "pages/Admin/types";
import useWalletContext from "hooks/useWalletContext";

export default function useUpdateMembers() {
  const { trigger, reset, getValues } = useFormContext<MemberUpdatorValues>();
  const apCW4Members = useGetter((state) => state.admin.apCW4Members);
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const { address: endowmentAddr } = useParams<EndowmentAddrParams>();
  const { wallet } = useWalletContext();
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  async function updateMembers() {
    const isValid = await trigger(["description", "title"], {
      shouldFocus: true,
    });
    if (!isValid) return;

    //check if there are changes
    type Diffs = [Member[], string[]];
    const [to_add, to_remove]: Diffs = apCW4Members.reduce(
      ([to_add, to_remove]: Diffs, memberCopy) => {
        const member: Member = {
          addr: memberCopy.addr,
          weight: memberCopy.weight,
        };
        if (memberCopy.is_added) {
          to_add.push(member);
        }
        if (memberCopy.is_deleted) {
          to_remove.push(member.addr);
        }
        return [to_add, to_remove];
      },
      [[], []]
    );

    if (to_remove.length <= 0 && to_add.length <= 0) {
      showModal<PopupProps>(Popup, { message: "No member changes" });
      return;
    }
    const contract = new Admin(cwContracts, wallet);
    const embeddedExecuteMsg = contract.createEmbeddedUpdateMembersMsg(
      to_add,
      to_remove
    );

    //create meta for proposal preview
    const memberUpdateMeta: ProposalMeta = {
      type: proposalTypes.adminGroup_updateMembers,
      data: {
        toAdd: to_add,
        toRemove: to_remove,
      },
    };

    const proposalTitle = getValues("title");
    const proposalDescription = getValues("description");

    const proposalMsg = contract.createProposalMsg(
      proposalTitle,
      proposalDescription,
      [embeddedExecuteMsg],
      JSON.stringify(memberUpdateMeta)
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
        successLink: genProposalsLink(cwContracts, endowmentAddr),
        successMessage: "Group member update proposal submitted",
      })
    );
    showModal(TransactionPromp, {});
    reset();
  }

  return { updateMembers };
}
