import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTxOptions } from "@terra-money/terra.js";
import { DonateValues } from "@types-component/donater";
import { ChainIDs } from "@types-lists";
import { Receiver } from "@types-server/aws";
import { StageUpdator } from "@types-slice/transaction";
import { WalletProxy } from "providers/WalletProvider";
import Contract from "contracts/Contract";
import handleTerraError from "helpers/handleTerraError";
import logDonation from "helpers/logDonation";
import { currency_text } from "constants/currency";
import transactionSlice, { setStage } from "../transactionSlice";

type TerraDonateArgs = {
  donateValues: DonateValues;
  tx: CreateTxOptions;
  wallet: WalletProxy | undefined;
};

export const sendTerraDonation = createAsyncThunk(
  `${transactionSlice.name}/terraDonate`,
  async (args: TerraDonateArgs, { dispatch }) => {
    const updateStage: StageUpdator = (update) => {
      dispatch(setStage(update));
    };
    try {
      if (!args.wallet) {
        updateStage({ step: "error", message: "Wallet is not connected" });
        return;
      }
      updateStage({ step: "submit", message: "Submitting transaction.." });

      const response = await args.wallet.post(args.tx!);
      const chainId = args.wallet.network.chainID as ChainIDs;

      if (response.success) {
        updateStage({ step: "submit", message: "Saving donation details" });

        const walletAddress = args.wallet.address;
        const { receiver, currency, amount, split_liq } = args.donateValues;

        const receipient: Receiver =
          typeof receiver === "string"
            ? { charityId: receiver }
            : { fundId: receiver };

        if (typeof receiver !== "undefined") {
          await logDonation({
            ...receipient,
            transactionId: response.result.txhash,
            transactionDate: new Date().toISOString(),
            chainId,
            amount: +amount,
            denomination: currency_text[currency],
            splitLiq: split_liq,
            walletAddress,
          });
        }

        updateStage({
          step: "broadcast",
          message: "Waiting for transaction details",
          txHash: response.result.txhash,
          chainId,
        });

        const contract = new Contract(args.wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateStage({
            step: "success",
            message: "Thank you for your donation",
            txHash: txInfo.txhash,
            chainId,
            isReceiptEnabled: typeof receiver !== "undefined",
            //share is enabled for both individual and tca donations
            isShareEnabled: true,
          });
        } else {
          updateStage({
            step: "error",
            message: "Transaction failed",
            txHash: txInfo.txhash,
            chainId,
          });
        }
      }
    } catch (err) {
      handleTerraError(err, updateStage);
    }
  }
);
