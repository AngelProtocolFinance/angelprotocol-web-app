import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { ID } from "contracts/createTx/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useLazyLatestBlockQuery } from "services/juno";
import { queryContract } from "services/juno/queryContract";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { hasElapsed } from "helpers/admin";

export default function useDestroyFund() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FV>();
  const sendTx = useTxSender();
  const { showModal } = useModalContext();
  const [latestBlock] = useLazyLatestBlockQuery();
  const { multisig, checkSubmit } = useAdminResources();

  async function destroyFund(fv: FV) {
    try {
      const height = await latestBlock({}).unwrap();
      const fund = await queryContract("index-fund.fund", { id: +fv.fundId });
      if (
        (fund.expiryTime !== 0 && hasElapsed(fund.expiryTime)) ||
        (fund.expiryHeight !== 0 && +height >= fund.expiryHeight)
      ) {
        return showModal(TxPrompt, { error: "Fund is already closed" });
      }
    } catch (err) {
      return showModal(TxPrompt, { error: "Fund not found" });
    }

    const result = checkSubmit();
    if (typeof result === "function") return result();

    const id: ID = { id: +fv.fundId };
    const [data, dest, meta] = encodeTx("index-fund.remove-fund", id, id);

    const { wallet, txMeta } = result;
    await sendTx({
      content: {
        type: "evm",
        val: createTx(wallet.address, "multisig.submit-transaction", {
          multisig,
          title: fv.title,
          description: fv.description,
          destination: dest,
          value: "0",
          data,
          meta: meta.encoded,
        }),
      },
      ...txMeta,
    });
  }

  return {
    destroyFund: handleSubmit(destroyFund),
    isSubmitDisabled: isSubmitting,
  };
}
