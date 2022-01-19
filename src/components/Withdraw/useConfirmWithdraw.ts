import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import Account from "../../contracts/Account";
import {
  setFormError,
  setStage,
} from "../../services/transaction/transactionSlice";
import { Step } from "../../services/transaction/types";
import { useSetter } from "../../store/accessors";
import { Values } from "./types";
import useHoldings from "./useHoldings";

export default function useConfirmWithdraw() {
  const { watch } = useFormContext<Values>();
  const address = watch("receiver") || "";
  const dispatch = useSetter();
  const wallet = useConnectedWallet();

  const { liquidCW20Tokens, anchorVault } = useHoldings(address || "");

  async function confirmWithdraw() {
    const withdrawTokenQty = Math.round(
      (liquidCW20Tokens! * Number(watch("withdraw"))) / 100
    ).toString();
    try {
      // Confirmed withdraw transaction
      const account = new Account(address, wallet);
      const transaction = await account.createWithdrawTx(
        anchorVault,
        withdrawTokenQty
      );

      // Posting the transaction
      dispatch(
        setStage({
          step: Step.submit,
          content: { message: "Submitting transaction..." },
        })
      );
      const response = await wallet!.post(transaction);

      // Get transaction info
      if (response.success) {
        dispatch(
          setStage({
            step: Step.success,
            content: {
              message: "Successfully withdrawn!",
              url: `https://finder.terra.money/${wallet!.network.chainID}/tx/${
                response.result.txhash
              }`,
            },
          })
        );
      }
    } catch (err) {
      console.error(err);
      dispatch(setFormError("Transaction failed"));
    }
  }

  return confirmWithdraw;
}
