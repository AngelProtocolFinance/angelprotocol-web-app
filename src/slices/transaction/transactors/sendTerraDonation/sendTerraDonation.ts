import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTxOptions } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { StageUpdater } from "../../types";
import { Chain, KYCData, Receiver } from "types/aws";
import { apesTags, invalidateApesTags } from "services/apes";
import { DonateValues } from "components/Transactors/Donater";
import { UnexpectedStateError, WalletDisconnectedError } from "errors/errors";
import handleTxError from "../../handleTxError";
import logDonation from "../../logDonation";
import transactionSlice, { setStage } from "../../transactionSlice";
import { pollTerraTxInfo } from "./pollTerraTxInfo";

type TerraDonateArgs = {
  wallet: ConnectedWallet | undefined;
  chain: Chain; // need to pass this chain object for displaying the Tx URL on successful Tx
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
      if (!args.wallet) {
        throw new WalletDisconnectedError();
      }

      if (args.wallet.network.chainID !== args.chain.chain_id) {
        throw new UnexpectedStateError(
          `Connected to the Terra Station wallet on '${args.wallet.network.chainID}', but passed chain data on '${args.chain.chain_id}' network`
        );
      }

      updateStage({ step: "submit", message: "Submitting transaction.." });

      const response = await args.wallet.post(args.tx);

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
            chainId: args.wallet.network.chainID,
            amount: +amount,
            denomination: token.symbol,
            splitLiq: split_liq,
            walletAddress: args.wallet.walletAddress,
          });
        }

        updateStage({
          step: "broadcast",
          message: "Waiting for transaction details",
          txHash: response.result.txhash,
          chain: args.chain,
        });

        const getTxInfo = pollTerraTxInfo(
          args.wallet,
          response.result.txhash,
          7,
          1000
        );
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateStage({
            step: "success",
            message: "Thank you for your donation",
            txHash: txInfo.txhash,
            chain: args.chain,
            //share is enabled for both individual and tca donations
            isShareEnabled: true,
          });

          //invalidate user balance and endowment balance
          dispatch(invalidateApesTags([{ type: apesTags.chain }]));
        } else {
          updateStage({
            step: "error",
            message: "Transaction failed",
            txHash: txInfo.txhash,
            chain: args.chain,
          });
        }
      }
    } catch (err) {
      handleTxError(err, updateStage);
    }
  }
);
