import { useAdminResources } from "pages/Admin/Guard";
import Modal from "components/Modal";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";

type Props = {
  autoExecute: boolean;
};

export default function AutoExecutePrompt({ autoExecute }: Props) {
  const { checkSubmit, multisig } = useAdminResources<"charity">();
  const { sendTx, isSending } = useTxSender(true);

  async function toggle() {
    const checkResult = checkSubmit();
    if (typeof checkResult === "function") return checkResult();

    const { wallet, txMeta } = checkResult;

    const [data, dest, meta] = encodeTx(
      "multisig.change-auto-execute",
      {
        multisig,
        autoExecute,
      },
      {
        title: `Turn auto-execute ${autoExecute ? "ON" : "OFF"}`,
        description: `proposer: ${wallet.address}`,
        content: null as never,
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
  }

  return (
    <Modal className="p-6 fixed-center z-10 grid gap-4 text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden">
      <p>
        Turn auto-execute{" "}
        <span className="font-bold">{autoExecute ? "ON" : "OFF"}</span> ?
      </p>
      <button
        type="button"
        onClick={toggle}
        className="btn btn-orange mt-6"
        disabled={isSending}
      >
        {isSending ? "Submitting.." : "Submit"}
      </button>
    </Modal>
  );
}
