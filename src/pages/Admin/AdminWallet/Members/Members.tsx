import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FV } from "./types";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { isTooltip, useAdminContext } from "../../Context";
import Form from "./Form";

export default function Members() {
  const sendTx = useTxSender();
  const { members, multisig, txResource } = useAdminContext();
  const methods = useForm<FV>({
    defaultValues: {
      initial: members,
      members,
      action: "initial",
    },
  });

  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<FV> = async (fv) => {
    if (isTooltip(txResource)) throw new Error(txResource);
    if (fv.action === "initial") throw new Error("no action selected"); //to narrow fv.action

    const prev = new Set(members);
    const curr = new Set(fv.members);

    const changes =
      fv.action === "add"
        ? fv.members.filter((m) => !prev.has(m))
        : fv.initial.filter((m) => !curr.has(m));

    const { wallet, txMeta } = txResource;
    const [data, dest, meta] = encodeTx(
      fv.action === "add" ? "multisig.add-owners" : "multisig.remove-owners",
      {
        multisig,
        addresses: changes,
      },
      {
        title: `${fv.action} members by ${wallet.address}`,
        description: `${fv.action} members by ${wallet.address}`,
        content: {
          action: fv.action,
          addresses: changes,
        },
      }
    );

    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig: dest,
      destination: dest,
      value: "0",
      data,
      meta: meta.encoded,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...txMeta,
      tagPayloads: getTagPayloads(txMeta.willExecute && meta.id),
    });
  };

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(submit)}
        onReset={(e) => {
          e.preventDefault();
          reset();
        }}
      />
    </FormProvider>
  );
}
