import { useConnectedWallet } from "@terra-money/wallet-provider";
import { FormikHelpers } from "formik";
import Account from "contracts/Account";
import { denoms } from "constants/curriencies";

interface Values {
  withdraw: string;
}

function useWithdrawHoldings(
  address: string,
  anchorVault: string,
  withdrawTokenQty: string
) {
  const wallet = useConnectedWallet();

  async function withdrawHoldings(
    values: Values,
    actions: FormikHelpers<Values>
  ) {
    values.withdraw = withdrawTokenQty;
    const tokenQty = values.withdraw;

    try {
      actions.setSubmitting(true);
      console.log("Vault:", anchorVault);
      console.log("Token QTY:", tokenQty);

      // Initiate withdraw transaction
      const account = new Account(address, wallet);
      console.log(account);
      const transaction = await account.createWithdrawTx(anchorVault, tokenQty);
      console.log(transaction);

      // Computing for fees
      const estimatedFee =
        transaction.fee!.amount.get(denoms.uusd)!.amount.toNumber() / 1e6;
      console.log("Estimated Fee:", estimatedFee);

      // Posting the transaction
      const response = await wallet!.post(transaction);

      // Check if tx is a success or error
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return withdrawHoldings;
}

export default useWithdrawHoldings;
