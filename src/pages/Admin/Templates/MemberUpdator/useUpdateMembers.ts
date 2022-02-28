import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Member } from "services/terra/admin/types";
import { setFormError } from "services/transaction/transactionSlice";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import TransactionPromp from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import Admin from "contracts/Admin";
import { useGetter, useSetter } from "store/accessors";
import { MemberUpdatorValues } from "./memberUpdatorSchema";

export default function useUpdateMembers() {
  const { trigger, reset } = useFormContext<MemberUpdatorValues>();
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
      dispatch(setFormError("no changes we're made"));
      return;
    }
    const contract = new Admin(wallet);
    const execute_msg = contract.createUpdateMembersMsg(to_add, to_remove);
    const proposalMsg = contract.createProposalMsg(
      "update member",
      "to update member",
      [execute_msg]
    );

    dispatch(
      sendTerraTx({
        wallet,
        msgs: [proposalMsg],
      })
    );
    showModal(TransactionPromp, {});
    reset();
  }

  return { updateMembers };
}
