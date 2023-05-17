import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";

export default function useDestroyFund() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FV>();
  const { showModal } = useModalContext();
  const sendTx = useTxSender();
  const { multisig, propMeta, getWallet } = useAdminResources();

  async function destroyFund(fv: FV) {
    if (fv.fundId === "") {
      return showModal(Prompt, {
        type: "error",
        title: "Destroy Fund",
        headline: "No Fund Selected",
        children: "Please select a fund to remove",
      });
    }

    const wallet = getWallet();
    if (typeof wallet === "function") return wallet();
    const [data, dest] = encodeTx("index-fund.remove-fund", { id: +fv.fundId });

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
        }),
      },
      ...propMeta,
    });
  }

  return {
    destroyFund: handleSubmit(destroyFund),
    isSubmitDisabled: isSubmitting,
  };
}
