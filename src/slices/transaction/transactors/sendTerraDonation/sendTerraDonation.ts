import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTxOptions } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { StageUpdater } from "slices/transaction/types";
import { Chain, KYCData, Receiver } from "types/server/aws";
import { invalidateJunoTags } from "services/juno";
import { junoTags, multicallTags } from "services/juno/tags";
import { DonateValues } from "components/Transactors/Donater";
import handleWalletError from "helpers/handleWalletError";
import logDonation from "helpers/logDonation";
import { UnexpectedStateError, WalletDisconnectError } from "errors/errors";
import transactionSlice, { setStage } from "../../transactionSlice";
import { pollTerraTxInfo } from "./pollTerraTxInfo";

type TerraDonateArgs = {
  wallet: ConnectedWallet | undefined;
  chain: Chain;
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
        throw new WalletDisconnectError();
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
            chainId: args.chain.chain_id,
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
            chainId: args.wallet.network.chainID,
          });
        }
      }
    } catch (err) {
      console.error(err);
      handleWalletError(err, updateStage);
    }
  }
);
