import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { Receiver } from "services/apes/types";
import { Dwindow, Providers } from "services/provider/types";
import { RootState } from "store/store";
import handleEthError from "helpers/handleEthError";
import logDonation from "helpers/logDonation";
import transactionSlice, { setStage } from "../transactionSlice";
import { StageUpdator, Step } from "../types";
import { EthDonateArgs } from "./transactorTypes";

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
      updateTx({ step: Step.submit, message: "Submitting transaction.." });
      let provider: ethers.providers.Web3Provider;

      if (activeProvider === Providers.ethereum) {
        provider = new ethers.providers.Web3Provider(dwindow.ethereum!);
      } else if (activeProvider === Providers.binance) {
        provider = new ethers.providers.Web3Provider(dwindow.BinanceChain!);
      } else {
        provider = new ethers.providers.Web3Provider(dwindow.xfi?.ethereum!);
      }

      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      const chainNum = await signer.getChainId();
      const chainId = `${chainNum}`;
      const response = await signer.sendTransaction(args.tx!);

      updateTx({ step: Step.submit, message: "Saving donation info.." });
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
        step: Step.success,
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
