import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { ethers } from "ethers";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { XdefiWindow } from "services/provider/types";
import handleEthError from "helpers/handleEthError";
import { denoms } from "constants/currency";
import { chainIDs } from "constants/chainIDs";
import { Values } from "./types";
import useDonationLogger from "./useDonationLogger";

export default function useEthSender(tx: TransactionRequest) {
  const logDonation = useDonationLogger();
  const { updateTx } = useTxUpdator();
  const { setValue, getValues } = useFormContext<Values>();

  const ethSender = useCallback(
    async (data: Values) => {
      try {
        const xwindow = window as XdefiWindow;

        updateTx({ step: Step.submit, message: "Submitting transaction.." });
        const provider = new ethers.providers.Web3Provider(
          xwindow.xfi?.ethereum!
        );
        const signer = provider.getSigner();
        const chainNum = await signer.getChainId();
        const chainId = `${chainNum}` as chainIDs;
        const response = await signer.sendTransaction(tx!);

        updateTx({
          step: Step.broadcast,
          message: "Waiting for transaction to be confirmed.",
          txHash: response.hash,
          chainId,
        });
        const receipt = await response.wait(1);

        updateTx({ step: Step.submit, message: "Saving donation info.." });
        const receiver = getValues("receiver");
        if (typeof receiver !== "undefined") {
          const logResponse = await logDonation(
            receipt.transactionHash,
            chainId,
            data.amount,
            denoms.ether,
            data.split_liq,
            receiver
          );

          if ("error" in logResponse) {
            //note: how can support prove that valid tx ticket belongs to the email sender?
            updateTx({
              step: Step.error,
              message:
                "Failed to log your donation for receipt purposes. Kindly send an email to support@angelprotocol.io",
              txHash: response.hash,
              chainId,
            });
            return;
          }
        }
        updateTx({
          step: Step.success,
          message: "Thank you for your donation!",
          txHash: response.hash,
          chainId,
        });
      } catch (error) {
        handleEthError(error, updateTx);
      } finally {
        setValue("amount", "");
      }
    },
    [tx]
  );

  return ethSender;
}
