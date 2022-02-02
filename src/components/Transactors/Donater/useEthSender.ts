import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { useFormContext } from "react-hook-form";
import { chainIDs } from "constants/chainIDs";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { XdefiWindow } from "services/provider/types";
import handleEthError from "helpers/handleEthError";
import { useCallback } from "react";
import { ethers } from "ethers";

export default function useEthSender(tx: TransactionRequest) {
  const { updateTx } = useTxUpdator();
  const { setValue } = useFormContext();

  const ethSender = useCallback(async () => {
    try {
      const xwindow = window as XdefiWindow;
      updateTx({ step: Step.submit, message: "Submitting transaction.." });

      const provider = new ethers.providers.Web3Provider(
        xwindow.xfi?.ethereum!
      );
      const signer = provider.getSigner();
      const response = await signer.sendTransaction(tx!);
      updateTx({
        step: Step.success,
        message: "Thank you for your donation!",
        chainId: chainIDs.eth_ropsten,
        txHash: response.hash,
      });
    } catch (error) {
      handleEthError(error, updateTx);
    } finally {
      setValue("amount", "");
    }
  }, [tx]);

  return ethSender;
}
