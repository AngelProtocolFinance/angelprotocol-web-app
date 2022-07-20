import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTxOptions } from "@terra-money/terra.js";
import { StageUpdater } from "slices/transaction/types";
import { KYCData, Receiver } from "types/server/aws";
import { invalidateJunoTags } from "services/juno";
import { junoTags, multicallTags } from "services/juno/tags";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { DonateValues } from "components/Transactors/Donater";
import handleWalletError from "helpers/handleWalletError";
import logDonation from "helpers/logDonation";
import { WalletDisconnectError } from "errors/errors";
import { terraChainId } from "constants/chainIDs";
import transactionSlice, { setStage } from "../../transactionSlice";
import { pollTerraTxInfo } from "./pollTerraTxInfo";
import postTerraTx from "./postTerraTx";

type TerraDonateArgs = {
  wallet: WalletState | undefined;
  donateValues: DonateValues;
  tx: CreateTxOptions;
  kycData?: KYCData;
};

export const sendTerraDonation = createAsyncThunk(
  `${transactionSlice.name}/terraDonate`,
  async (args: TerraDonateArgs, { dispatch }) => {
    const updateStage: StageUpdater = (update) => {
      dispatch(setStage(update));
    };
    try {
      if (!args.wallet) throw new WalletDisconnectError();
      updateStage({ step: "submit", message: "Submitting transaction.." });

      const response = await postTerraTx(args.tx);

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
            walletAddress: args.wallet.address,
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
            chainId: terraChainId,
            //share is enabled for both individual and tca donations
            isShareEnabled: true,
          });

          //invalidate user balance and endowment balance
          dispatch(
            invalidateJunoTags([
              { type: junoTags.multicall, id: multicallTags.endowmentBalance },
              { type: junoTags.multicall, id: multicallTags.terraBalances },
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
      handleWalletError(err, updateStage);
    }
  }
);
