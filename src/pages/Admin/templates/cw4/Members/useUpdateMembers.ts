import { useFormContext } from "react-hook-form";
import { MemberUpdatorValues } from "pages/Admin/types";
import { CW4Member } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Prompt from "components/Prompt";
import { useGetter } from "store/accessors";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";

export default function useUpdateMembers() {
  const { trigger, reset } = useFormContext<MemberUpdatorValues>();
  const { multisig, propMeta } = useAdminResources();
  const apCW4Members = useGetter((state) => state.admin.apCW4Members);
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  async function updateMembers() {
    const isValid = await trigger(["description", "title"], {
      shouldFocus: true,
    });
    if (!isValid) return;

    //check if there are changes
    type Diffs = [CW4Member[], string[]];
    const [to_add, to_remove]: Diffs = apCW4Members.reduce(
      ([to_add, to_remove]: Diffs, memberCopy) => {
        const member: CW4Member = {
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
      return showModal(Prompt, {
        type: "error",
        title: "Update Members",
        headline: "No Member Changes",
        children: "Nothing to submit, no member changes",
      });
    }

    if (!wallet) {
      return alert("wallet not connected");
    }

    const [data, dest] = encodeTx("multisig.add-owner", {
      multisig,
      address: "0x6CAd9deFc6c024CA1f714ff4d468Fa9FEB3032b5",
    });

    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig: dest,
      title: "hello world",
      description: "hahahdfas",
      destination: dest,
      value: "0",
      data,
    });

    //TODO: part of tx migration

    await sendTx({
      content: { type: "evm", val: tx },
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "cw4_members"),
    });
    reset();
  }

  return { updateMembers, apCW4Members };
}
