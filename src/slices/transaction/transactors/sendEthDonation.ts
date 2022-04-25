import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dwindow } from "@types-slice/provider";
import { StageUpdator } from "@types-slice/transaction";
import { ethers } from "ethers";
import { RootState } from "store/store";
import logDonation from "components/Transactors/Donater/logDonation";
import handleEthError from "helpers/handleEthError";
import { chainIDs } from "constants/chainIDs";
import transactionSlice, { setStage } from "../transactionSlice";
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
      const chainId = `${chainNum}` as chainIDs;
      const response = await signer.sendTransaction(args.tx!);

      updateTx({ step: "submit", message: "Saving donation info.." });
      const { receiver, currency, amount, split_liq } = args.donateValues;
      if (typeof receiver !== "undefined") {
        await logDonation(
          response.hash,
          chainId,
          amount,
          currency,
          split_liq,
          walletAddress,
          receiver
        );
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
