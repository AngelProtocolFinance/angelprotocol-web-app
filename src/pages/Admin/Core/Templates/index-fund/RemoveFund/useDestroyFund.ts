import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isPolygonChain } from "helpers/isPolygonChain";

export default function useDestroyFund() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FV>();
  const { showModal } = useModalContext();
  const sendTx = useTxSender();
  const { multisig, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();

  async function destroyFund(fv: FV) {
    if (fv.fundId === "") {
      return showModal(Prompt, {
        type: "error",
        title: "Destroy Fund",
        headline: "No Fund Selected",
        children: "Please select a fund to remove",
      });
    }

    if (!wallet) {
      return showModal(Prompt, {
        type: "error",
        children: "Please connect your wallet to continue",
      });
    }

    if (!isPolygonChain(wallet.chain.chain_id)) {
      return showModal(Prompt, {
        type: "error",
        children: "Please connect to the Polygon Network",
      });
    }

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
