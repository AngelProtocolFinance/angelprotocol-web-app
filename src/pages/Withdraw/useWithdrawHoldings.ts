import { useConnectedWallet } from "@terra-money/wallet-provider";
import { FormikHelpers } from "formik";
import Account from "contracts/Account";
import { denoms } from "constants/curriencies";
import createStatusFromError from "./createStatusFromError";
import { Status, SetStatus, Values, Steps } from "./types";
import toCurrency from "helpers/toCurrency";

function useWithdrawHoldings(
  status: Status,
  setStatus: SetStatus,
  address: string,
  anchorVault: string,
  withdrawAmount: number,
  withdrawTokenQty: string
) {
  const wallet = useConnectedWallet();

  async function withdrawHoldings(
    values: Values,
    actions: FormikHelpers<Values>
  ) {
    try {
      actions.setSubmitting(true);

      // Withdraw amount should be at least $2
      if (toCurrency(withdrawAmount) <= "1.99") {
        setStatus({
          step: Steps.error,
          message: "Withdraw amount is too low",
        });
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
      if (status.step !== Steps.ready) {
        setStatus({
          step: Steps.confirm,
          message: "Kindly confirm the transaction details",
          estimates: {
            amount: withdrawAmount,
            txFee: estimatedFee,
            total: withdrawAmount - estimatedFee,
          },
        });
        return;
      }
    } catch (err) {
      console.error(err);
      const errorStatus = createStatusFromError(err);
      setStatus(errorStatus);
    }
  }

  return withdrawHoldings;
}

export default useWithdrawHoldings;
