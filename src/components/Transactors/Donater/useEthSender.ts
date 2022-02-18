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
        const walletAddress = await signer.getAddress();
        const chainNum = await signer.getChainId();
        const chainId = `${chainNum}` as chainIDs;
        const response = await signer.sendTransaction(tx!);

        updateTx({ step: Step.submit, message: "Saving donation info.." });
        const receiver = getValues("receiver");
        if (typeof receiver !== "undefined") {
          const logResponse = await logDonation(
            response.hash,
            chainId,
            data.amount,
            denoms.ether,
            data.split_liq,
            walletAddress,
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
          isReceiptEnabled: typeof receiver !== "undefined",
        });
      } catch (error) {
        handleEthError(error, updateTx);
      } finally {
        setValue("amount", "");
      }
    },
    //eslint-disable-next-line
    [tx]
  );

  return ethSender;
}
