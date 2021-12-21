import { useConnectedWallet } from "@terra-money/wallet-provider";
import Account from "contracts/Account";
import createStatusFromError from "./createStatusFromError";
import { SetStatus, Steps } from "./types";

function useConfirmWithdraw(
  setStatus: SetStatus,
  address: string,
  anchorVault: string,
  withdrawAmount: number,
  withdrawTokenQty: string
) {
  const wallet = useConnectedWallet();

  async function confirmWithdraw() {
    try {
      // Confirmed withdraw transaction
      const account = new Account(address, wallet);
      const transaction = await account.createWithdrawTx(
        anchorVault,
        withdrawTokenQty
      );

      // Posting the transaction
      setStatus({
        step: Steps.waiting,
        message: "Waiting for transaction result",
      });
      const response = await wallet!.post(transaction);

      // Get transaction info
      if (response.success) {
        setStatus({
          step: Steps.success,
          message: "Successfully withdrawn!",
          result: {
            withdrawn: withdrawAmount,
            url: `https://finder.terra.money/${wallet!.network.chainID}/tx/${
              response.result.txhash
            }`,
          },
        });
      }
    } catch (err) {
      console.error(err);
      const errorStatus = createStatusFromError(err);
      setStatus(errorStatus);
    }
  }

  return confirmWithdraw;
}

export default useConfirmWithdraw;
