import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { NewFund } from "types/contracts";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { useGetter } from "store/accessors";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { blockTime } from "helpers/admin";
import { useAdminContext } from "../../../../Context";
import { INIT_SPLIT } from "./index";

export default function useCreateFund() {
  const { multisig, checkSubmit } = useAdminContext();
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
      "expiryHeight",
      "expiryTime",
    ]);

    if (!isValid) return;
    const result = checkSubmit();
    if (typeof result === "function") return result();

    const currHeight = getValues("height");
    let expiryHeight = getValues("expiryHeight");

    if (+expiryHeight < +currHeight) {
      return showModal(TxPrompt, {
        error: `Expiry height must be greater than current block height ${currHeight}`,
      });
    }

    const expiryTime = getValues("expiryTime");
    const split = getValues("splitToLiquid");

    const newFund: NewFund = {
      name: getValues("name"),
      description: getValues("about"),
      members: newFundMembers.map((m) => m.toString()),
      rotatingFund: getValues("rotatingFund"),
      splitToLiquid: split === INIT_SPLIT ? "0" : split,
      expiryTime: expiryTime === "" ? "0" : blockTime(expiryTime).toString(),
      expiryHeight: expiryHeight === "" ? "0" : expiryHeight,
    };

    const [data, dest, meta] = encodeTx(
      "index-fund.create-fund",
      newFund,
      newFund
    );

    const { wallet, txMeta } = result;
    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      title: getValues("title"),
      description: getValues("description"),
      destination: dest,
      value: "0",
      data,
      meta: meta.encoded,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...txMeta,
    });

    setSubmitting(false);
  }

  return { createFund, isSubmitting };
}
