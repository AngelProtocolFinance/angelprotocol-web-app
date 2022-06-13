import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTxOptions } from "@terra-money/terra.js";
import { ProviderId } from "contexts/WalletContext/types";
import { StageUpdator } from "slices/transaction/types";
import { KYCData, Receiver } from "types/server/aws";
import { multicallTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { DonateValues } from "components/Transactors/Donater";
import { getTerraPoster } from "helpers/getTerraPoster";
import handleTerraError from "helpers/handleTerraError";
import logDonation from "helpers/logDonation";
import { pollTerraTxInfo } from "helpers/pollTerraTxInfo";
import { terraChainId } from "constants/env";
import transactionSlice, { setStage } from "../transactionSlice";

type TerraDonateArgs = {
  donateValues: DonateValues;
  tx: CreateTxOptions;
  walletAddr: string;
  providerId: ProviderId;
  kycData?: KYCData;
};

export const sendTerraDonation = createAsyncThunk(
  `${transactionSlice.name}/terraDonate`,
  async (args: TerraDonateArgs, { dispatch }) => {
    const updateStage: StageUpdator = (update) => {
      dispatch(setStage(update));
    };
    try {
      updateStage({ step: "submit", message: "Submitting transaction.." });

      const response = await getTerraPoster(args.providerId)(args.tx!);

      if (response.success) {
        updateStage({ step: "submit", message: "Saving donation details" });

        const { receiver, token, amount, split_liq } = args.donateValues;

        const receipient: Receiver =
          typeof receiver === "string"
            ? { charityId: receiver }
            : { fundId: receiver };

        if (typeof receiver !== "undefined") {
          await logDonation({
            ...receipient,
            ...args.kycData,
            transactionId: response.result.txhash,
            transactionDate: new Date().toISOString(),
            chainId: terraChainId,
            amount: +amount,
            denomination: token.symbol,
            splitLiq: split_liq,
            walletAddress: args.walletAddr,
          });
        }

        updateStage({
          step: "broadcast",
          message: "Waiting for transaction details",
          txHash: response.result.txhash,
          chainId: terraChainId,
        });

        const getTxInfo = pollTerraTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateStage({
            step: "success",
            message: "Thank you for your donation",
            txHash: txInfo.txhash,
            txInfo,
            chainId: terraChainId,
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
            chainId: terraChainId,
          });
        }
      }
    } catch (err) {
      console.error(err);
      handleTerraError(err, updateStage);
    }
  }
);
