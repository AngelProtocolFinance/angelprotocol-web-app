import { createAsyncThunk } from "@reduxjs/toolkit";
import logDonation from "components/Transactors/Donater/logDonation";
import { chainIDs } from "constants/chainIDs";
import Contract from "contracts/Contract";
import transactionSlice, { setStage } from "./transactionSlice";
import { DonateArgs, Step } from "./types";
export const donate = createAsyncThunk(
  `${transactionSlice.name}/donate`,
  async (args: DonateArgs, { dispatch }) => {
    try {
      if (!args.wallet) {
        dispatch(
          setStage({ step: Step.error, message: "Wallet is not connected" })
        );
        return;
      }
      dispatch(
        setStage({ step: Step.submit, message: "Submitting transaction.." })
      );

      const response = await args.wallet.post(args.tx!);
      const chainId = args.wallet.network.chainID as chainIDs;

      if (response.success) {
        dispatch(
          setStage({ step: Step.submit, message: "Saving donation details" })
        );

        const walletAddress = args.wallet.walletAddress;
        const { receiver, currency, amount, split_liq } = args.donateValues;

        if (typeof receiver !== "undefined") {
          await logDonation(
            response.result.txhash,
            chainId,
            amount,
            currency,
            split_liq,
            walletAddress,
            receiver
          );
          // if ("error" in logResponse) {
          //   //note: how can support prove that valid tx ticket belongs to the email sender?
          //   dispatch(
          //     setStage({
          //       step: Step.error,
          //       message:
          //         "Failed to log your donation for receipt purposes. Kindly send an email to support@angelprotocol.io",
          //       txHash: response.result.txhash,
          //       chainId,
          //     })
          //   );
          //   return;
          // }
        }

        dispatch(
          setStage({
            step: Step.broadcast,
            message: "Waiting for transaction details",
            txHash: response.result.txhash,
            chainId,
          })
        );

        const contract = new Contract(args.wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          dispatch(
            setStage({
              step: Step.success,
              message: "Thank you for your donation",
              txHash: txInfo.txhash,
              chainId,
              isReceiptEnabled: typeof receiver !== "undefined",
            })
          );
        } else {
          dispatch(
            setStage({
              step: Step.error,
              message: "Transaction failed",
              txHash: txInfo.txhash,
              chainId,
            })
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
);
