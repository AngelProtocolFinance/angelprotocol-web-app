import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { FundMemberUpdate } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetter } from "store/accessors";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";

export default function useUpdateFund() {
  const { trigger, reset, getValues } = useFormContext<FormValues>();
  const { multisig, checkSubmit } = useAdminResources();
  const [isLoading, setIsLoading] = useState(false);
  const fundMembers = useGetter((state) => state.admin.fundMembers);
  const { handleError } = useErrorContext();
  const sendTx = useTxSender();

  async function updateFund() {
    try {
      setIsLoading(true);
      const isValid = await trigger(["description", "title"], {
        shouldFocus: true,
      });
      if (!isValid) return;

      const fundId = getValues("fundId");
      if (fundId === "") {
        throw new Error("No fund selected");
      }
      //check if there are changes
      type Diffs = [string[], string[]];
      const [toAdd, toRemove]: Diffs = fundMembers.reduce(
        ([toAdd, toRemove]: Diffs, fundMember) => {
          if (fundMember.isAdded) {
            toAdd.push(fundMember.id);
          }
          if (fundMember.isDeleted) {
            toRemove.push(fundMember.id);
          }
          return [toAdd, toRemove];
        },
        [[], []]
      );

      if (toRemove.length <= 0 && toAdd.length <= 0) {
        throw new Error("No fund member changes");
      }
      const result = checkSubmit();
      if (typeof result === "function") return result();

      const modified = new Set([...fundMembers.map((f) => f.id), ...toAdd]);
      toRemove.forEach((id) => modified.delete(id));

      const update: FundMemberUpdate = {
        fundId: +fundId,
        members: Array.from(modified),
      };

      const [data, dest, meta] = encodeTx("index-fund.update-members", update, {
        title: getValues("title"),
        description: getValues("description"),
        content: update,
      });

      const { wallet, txMeta } = result;
      const tx = createTx(wallet.address, "multisig.submit-transaction", {
        multisig,

        destination: dest,
        value: "0",
        data,
        meta: meta.encoded,
      });

      await sendTx({
        content: { type: "evm", val: tx },
        ...txMeta,
      });
      reset();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    updateFund,
    isSubmitDisabled: isLoading,
  };
}
