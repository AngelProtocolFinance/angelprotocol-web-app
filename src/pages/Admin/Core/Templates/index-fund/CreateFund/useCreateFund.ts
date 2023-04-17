import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import { useGetter } from "store/accessors";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { blockTime } from "helpers/admin";
import { INIT_SPLIT } from "./index";

export default function useCreateFund() {
  const { multisig, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const sendTx = useTxSender();
  const { showModal } = useModalContext();
  const { trigger, getValues } = useFormContext<FormValues>();
  const newFundMembers = useGetter((state) => state.admin.newFundMembers);

  const [isSubmitting, setSubmitting] = useState(false);

  async function createFund() {
    setSubmitting(true);
    //validate select fields
    const isValid = await trigger([
      "title",
      "description",
      "name",
      "about",
      "expiry.height",
      "expiry.time",
    ]);

    if (!isValid) return;

    if (!wallet) {
      return showModal(TxPrompt, {
        error: "Wallet not connected",
      });
    }

    const currHeight = getValues("height");
    let expiryHeight = getValues("expiry.height");

    if (+expiryHeight < +currHeight) {
      return showModal(TxPrompt, {
        error: `Expiry height must be greater than current block height ${currHeight}`,
      });
    }

    const expiryTime = getValues("expiry.time");
    const split = getValues("liqSplit");

    const [data, dest] = encodeTx("index-fund.create-fund", {
      name: getValues("name"),
      description: getValues("about"),
      members: newFundMembers,
      rotatingFund: getValues("isRotating"),
      splitToLiquid: split === INIT_SPLIT ? 0 : +split,
      expiryTime: expiryTime === "" ? 0 : blockTime(expiryTime),
      expiryHeight: expiryHeight === "" ? 0 : +expiryHeight,
    });

    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      title: getValues("title"),
      description: getValues("description"),
      destination: dest,
      value: "0",
      data,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...propMeta,
    });

    setSubmitting(false);
  }

  return { createFund, isSubmitting };
}
