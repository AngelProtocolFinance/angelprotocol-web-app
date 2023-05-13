import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetWallet } from "contexts/WalletContext";
import { useGetter } from "store/accessors";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isPolygonChain } from "helpers/isPolygonChain";

export default function useUpdateFund() {
  const { trigger, reset, getValues } = useFormContext<FormValues>();
  const { multisig, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
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

      if (!wallet) {
        throw new Error("Wallet is not connected");
      }

      if (!isPolygonChain(wallet.chain.chain_id)) {
        throw new Error("Please connect on Polygon Network");
      }

      const [data, dest] = encodeTx("index-fund.update-members", {
        fundId: +fundId,
        add: toAdd.map((a) => +a),
        remove: toRemove.map((r) => +r),
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
