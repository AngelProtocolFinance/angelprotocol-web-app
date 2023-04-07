import { useFormContext } from "react-hook-form";
import { MemberUpdatorValues } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";

export default function useUpdateMembers() {
  const { reset } = useFormContext<MemberUpdatorValues>();
  const { multisig, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const sendTx = useTxSender();

  async function updateMembers() {
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

  return { updateMembers };
}
