import { useConnectedWallet } from "@terra-money/wallet-provider";
import Account from "../../contracts/Account";
import { denoms } from "../../constants/currency";
import { Values } from "./types";
import { Step } from "services/transaction/types";
import { useFormContext } from "react-hook-form";
import { useSetter } from "store/accessors";
import { setFormError, setStage } from "services/transaction/transactionSlice";
import useHoldings from "./useHoldings";
import useEstimator from "./useEstimator";

export default function useWithdrawHoldings() {
  const { watch } = useFormContext<Values>();
  const address = watch("receiver") || "";
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { liquidCW20Tokens, liquidCW20TokenValue, anchorVault } = useHoldings(
    address || ""
  );
  const tx = useEstimator(liquidCW20Tokens, liquidCW20TokenValue, anchorVault);

  async function handleWithdrawHoldings() {
    const amount = watch("withdraw");
    const withdrawTokenQty = Math.round(
      (liquidCW20Tokens! * Number(amount)) / 100
    ).toString();
    try {
      // Initiate withdraw transaction
      const account = new Account(address, wallet);
      const transaction = await account.createWithdrawTx(
        anchorVault,
        withdrawTokenQty
      );

      // Let the user confirm the transaction
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
      dispatch(setFormError("Withdraw failed"));
    }
  }

  return handleWithdrawHoldings;
}
