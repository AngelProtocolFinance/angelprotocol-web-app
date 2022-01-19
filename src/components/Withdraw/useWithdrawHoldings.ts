import { useConnectedWallet } from "@terra-money/wallet-provider";
import Account from "../../contracts/Account";
import { denoms } from "../../constants/currency";
import { Values } from "./types";
import { Step } from "services/transaction/types";
import toCurrency from "../../helpers/toCurrency";
import { useFormContext } from "react-hook-form";
import { useSetter } from "store/accessors";
import { setFormError, setStage } from "services/transaction/transactionSlice";
import useHoldings from "./useHoldings";
import useEstimator from "./useEstimator";

export default function useWithdrawHoldings() {
  const { watch, setValue } = useFormContext<Values>();
  const address = watch("receiver") || "";
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { liquidCW20Tokens, liquidCW20TokenValue, anchorVault } = useHoldings(
    address || ""
  );
  const tx = useEstimator(liquidCW20Tokens, liquidCW20TokenValue, anchorVault);

  async function handleWithdrawHoldings() {
    const amount = watch("withdraw");
    const withdrawAmount = (liquidCW20TokenValue! * Number(amount)) / 100;
    const withdrawTokenQty = Math.round(
      (liquidCW20Tokens! * Number(amount)) / 100
    ).toString();
    try {
      // Withdraw amount should be at least $2
      if (toCurrency(withdrawAmount) <= "1.99") {
        dispatch(
          setStage({
            step: Step.error,
            content: { message: "Withdraw amount is too low" },
          })
        );
        return;
      }

      // Initiate withdraw transaction
      const account = new Account(address, wallet);
      const transaction = await account.createWithdrawTx(
        anchorVault,
        withdrawTokenQty
      );

      // Computing for fees
      const estimatedFee =
        transaction.fee!.amount.get(denoms.uusd)!.amount.toNumber() / 1e6;
      // Let the user confirm the transaction
      dispatch(
        setStage({
          step: Step.confirm,
          content: {
            message: "Kindly confirm the transaction details",
          },
        })
      );
      setValue("withdrawAmount", withdrawAmount);
      setValue("total", withdrawAmount - estimatedFee);
    } catch (err) {
      console.error(err);
      dispatch(setFormError("Withdraw failed"));
    }
  }

  return handleWithdrawHoldings;
}
