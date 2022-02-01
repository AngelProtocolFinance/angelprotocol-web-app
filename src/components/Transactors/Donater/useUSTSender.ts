import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import handleTerraError from "helpers/handleTerraError";
import useTxUpdator from "services/transaction/updators";
import { Step } from "services/transaction/types";
import { Values } from "components/Transactors/Donater/types";
import Contract from "contracts/Contract";
import { chainIDs } from "constants/chainIDs";
import { CreateTxOptions } from "@terra-money/terra.js";
import { useCallback } from "react";

export default function useUSTSender(tx: CreateTxOptions) {
  const { reset, getValues } = useFormContext<Values>();
  const wallet = useConnectedWallet();
  const { updateTx } = useTxUpdator();

  //data:Data
  const ustSender = useCallback(async () => {
    try {
      if (!wallet) {
        updateTx({ step: Step.error, message: "Wallet is not connected" });
        return;
      }
      updateTx({ step: Step.submit, message: "Submitting transaction.." });
      const response = await wallet.post(tx!);

      if (response.success) {
        updateTx({
          step: Step.broadcast,
          message: "Waiting for transaction result",
          txHash: response.result.txhash,
          chainId: wallet.network.chainID as chainIDs,
        });

        const contract = new Contract(wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateTx({
            step: Step.success,
            message: "Thank you for your donation",
            txHash: txInfo.txhash,
            chainId: wallet.network.chainID as chainIDs,
            details: {
              amount: getValues("amount"),
              split_liq: getValues("split_liq"),
              to: getValues("to"),
              receiver: getValues("receiver"),
            },
          });
          //TODO:invalidate tags here
        } else {
          updateTx({
            step: Step.error,
            message: "Transaction failed",
            txHash: txInfo.txhash,
            chainId: wallet.network.chainID as chainIDs,
          });
        }
      }
    } catch (err) {
      console.error(err);
      handleTerraError(err, updateTx);
    } finally {
      reset();
    }
  }, [tx]);

  return ustSender;
}
