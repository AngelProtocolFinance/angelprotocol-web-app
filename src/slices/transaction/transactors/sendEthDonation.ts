import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { StageUpdator } from "slices/transaction/types";
import { Receiver } from "types/server/aws";
import { DonateValues } from "components/Transactors/Donater";
import { RootState } from "store/store";
import { Dwindow } from "slices/providerSlice";
import handleEthError from "helpers/handleEthError";
import logDonation from "helpers/logDonation";
import transactionSlice, { setStage } from "../transactionSlice";

type EthDonateArgs = {
  tx: TransactionRequest;
  donateValues: DonateValues;
};

export const sendEthDonation = createAsyncThunk(
  `${transactionSlice.name}/ethDonate`,
  async (args: EthDonateArgs, { dispatch, getState }) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };

    try {
      const dwindow = window as Dwindow;
      const state = getState() as RootState;
      const activeProvider = state.provider.active;
      updateTx({ step: "submit", message: "Submitting transaction.." });
      let provider: ethers.providers.Web3Provider;

      if (activeProvider === "ethereum") {
        provider = new ethers.providers.Web3Provider(dwindow.ethereum!);
      } else if (activeProvider === "binance") {
        provider = new ethers.providers.Web3Provider(dwindow.BinanceChain!);
      } else {
        provider = new ethers.providers.Web3Provider(dwindow.xfi?.ethereum!);
      }

      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      const chainNum = await signer.getChainId();
      const chainId = `${chainNum}`;
      const response = await signer.sendTransaction(args.tx!);

      updateTx({ step: "submit", message: "Saving donation info.." });
      const { receiver, token, amount, split_liq } = args.donateValues;
      const receipient: Receiver =
        typeof receiver === "string"
          ? { charityId: receiver }
          : { fundId: receiver };

      if (typeof receiver !== "undefined") {
        await logDonation({
          ...receipient,
          transactionId: response.hash,
          transactionDate: new Date().toISOString(),
          chainId,
          amount: +amount,
          denomination: token.symbol,
          splitLiq: split_liq,
          walletAddress,
        });
      }
      updateTx({
        step: "success",
        message: "Thank you for your donation!",
        txHash: response.hash,
        chainId,
        isReceiptEnabled: typeof receiver !== "undefined",
        isShareEnabled: true,
      });
    } catch (error) {
      console.error(error);
      handleEthError(error, updateTx);
    }
  }
);
