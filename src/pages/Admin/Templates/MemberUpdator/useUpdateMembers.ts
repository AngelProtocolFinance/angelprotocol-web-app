import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
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

export default function useUpdateMembers() {
  const { trigger, reset, getValues } = useFormContext<MemberUpdatorValues>();
  const wallet = useConnectedWallet();
  const membersCopy = useGetter((state) => state.admin.members);
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  async function updateMembers() {
    const isValid = await trigger(["description", "title"], {
      shouldFocus: true,
    });
    if (!isValid) return;

    //check if there are changes
    type Diffs = [Member[], string[]];
    const [to_add, to_remove]: Diffs = membersCopy.reduce(
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
    const contract = new Admin(wallet);
    const embeddedExecuteMsg = contract.createEmbeddedUpdateMembersMsg(
      to_add,
      to_remove
    );

    const proposalTitle = getValues("title");
    const proposalDescription = getValues("description");

    const proposalMsg = contract.createProposalMsg(
      proposalTitle,
      proposalDescription,
      [embeddedExecuteMsg]
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
      })
    );
    showModal(TransactionPromp, {});
    reset();
  }

  return { updateMembers };
}
