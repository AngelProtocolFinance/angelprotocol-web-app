import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CWMemberUpdateMeta, MemberUpdatorValues } from "pages/Admin/types";
import { EndowmentAdminParams } from "pages/EndowmentAdmin/types";
import { Member } from "types/server/contracts";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPromp from "components/Transactor/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors/sendCosmosTx";
import Admin from "contracts/Admin";
import genProposalsLink from "../genProposalsLink";

export default function useUpdateMembers() {
  const { trigger, reset, getValues } = useFormContext<MemberUpdatorValues>();
  const apCW4Members = useGetter((state) => state.admin.apCW4Members);
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const { address: endowmentAddr } = useParams<EndowmentAdminParams>();
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();
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
      showModal(Popup, { message: "No member changes" });
      return;
    }
    const contract = new Admin(cwContracts, wallet?.address);
    const embeddedExecuteMsg = contract.createEmbeddedUpdateMembersMsg(
      to_add,
      to_remove
    );

    //create meta for proposal preview
    const memberUpdateMeta: CWMemberUpdateMeta = {
      type: "admin-group-update-members",
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
      sendCosmosTx({
        wallet,
        msgs: [proposalMsg],
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.admin, id: adminTags.proposals },
          ]),
        ],
        successLink: genProposalsLink(cwContracts, endowmentAddr),
        successMessage: "Group member update proposal submitted",
      })
    );
    showModal(TransactionPromp, {});
    reset();
  }

  return { updateMembers, apCW4Members };
}
