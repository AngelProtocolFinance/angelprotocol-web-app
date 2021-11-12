import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import { Values as Data, Values } from "components/Donater/types";
import { useSetModal } from "components/Nodal/Nodal";
import ErrPop, { Props as ErrProps } from "./ErrPop";
import Result, { Props as ResProps } from "./Result";
import Waiter, { Props as WaitProps } from "./Waiter";
import getDepositAmount from "./getDepositAmount";
import displayTerraError from "./displayTerraError";
import useTerraEstimator from "./useTerraEstimator";
import Contract from "contracts/Contract";

function useTerraSender() {
  const { reset } = useFormContext<Values>();
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();
  const tx = useTerraEstimator();

  async function sender(data: Data) {
    const UST_amount = data.amount;
    // const liquid_split = 100 - Number(data.split);

    try {
      if (!wallet) {
        showModal<ErrProps>(ErrPop, {
          desc: "No Terra wallet is currently connected",
        });
        return;
      }

      const response = await wallet.post(tx!);

      if (response.success) {
        showModal<WaitProps>(Waiter, {
          desc: "Waiting for transaction result",
          url: `https://finder.terra.money/${wallet.network.chainID}/tx/${response.result.txhash}`,
        });

        const contract = new Contract(wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          const depositAmount = getDepositAmount(
            txInfo.logs!,
            wallet.network.chainID
          );
          showModal<ResProps>(Result, {
            sent: +UST_amount,
            received: depositAmount,
            url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
          });
        } else {
          showModal<ErrProps>(ErrPop, {
            desc: "Transaction failed",
            url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
          });
        }
      }
    } catch (err) {
      displayTerraError(err, showModal);
    } finally {
      reset();
    }
  }

  return sender;
}

export default useTerraSender;
