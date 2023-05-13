import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "../types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { scale } from "helpers";
import { getTagPayloads } from "helpers/admin";
import { isPolygonChain } from "helpers/isPolygonChain";

export default function useTransferFunds() {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<FV>();
  const { multisig, propMeta } = useAdminResources();
  //TODO: use wallet token[] to list amounts to transfer
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  async function transferFunds(fv: FV) {
    if (!wallet) {
      return showModal(Prompt, {
        type: "error",
        children: "Wallet is not connected",
      });
    }

    if (!isPolygonChain(wallet.chain.chain_id)) {
      return showModal(Prompt, {
        type: "error",
        children: "Please connect on Polygon Network",
      });
    }

    const { token, recipient } = fv;
    const scaledAmount = scale(token.amount, token.decimals).toHex();

    const [data, dest, value] =
      token.type === "erc20"
        ? encodeTx("erc20.transfer", {
            erc20: token.token_id,
            to: recipient,
            amount: scaledAmount,
          }).concat(["0"])
        : ["0x" /** empty data */, recipient, scaledAmount];

    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      title: fv.title,
      description: fv.description,
      destination: dest,
      value,
      data,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "cw3_transfer"),
    });
  }

  return {
    transferFunds: handleSubmit(transferFunds),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
