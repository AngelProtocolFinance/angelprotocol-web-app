import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTxOptions } from "@terra-money/terra.js";
import { StageUpdator } from "slices/transaction/types";
import { Receiver } from "types/server/aws";
import { multicallTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { WalletProxy } from "providers/WalletProvider";
import { DonateValues } from "components/Transactors/Donater";
import Contract from "contracts/Contract";
import handleTerraError from "helpers/handleTerraError";
import logDonation from "helpers/logDonation";
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
      const chainId = args.wallet.network.chainID;

      if (response.success) {
        updateStage({ step: "submit", message: "Saving donation details" });

        const walletAddress = args.wallet.address;
        const { receiver, token, amount, split_liq } = args.donateValues;

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
            denomination: token.symbol,
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
            txInfo,
            chainId,
            isReceiptEnabled: typeof receiver !== "undefined",
            //share is enabled for both individual and tca donations
            isShareEnabled: true,
          });

          //invalidate user balance and endowment balance
          dispatch(
            terra.util.invalidateTags([
              { type: terraTags.multicall, id: multicallTags.endowmentBalance },
              { type: terraTags.multicall, id: multicallTags.terraBalances },
            ])
          );
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
