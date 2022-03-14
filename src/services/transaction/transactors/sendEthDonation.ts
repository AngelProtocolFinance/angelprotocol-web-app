import { ethers } from "ethers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import logDonation from "components/Transactors/Donater/logDonation";
import handleEthError from "helpers/handleEthError";
import { ProviderWindow } from "services/provider/types";
import { chainIDs } from "constants/chainIDs";
import transactionSlice, { setStage } from "../transactionSlice";
import { EthDonateArgs } from "./transactorTypes";
import { StageUpdator, Step } from "../types";

export const sendEthDonation = createAsyncThunk(
  `${transactionSlice.name}/ethDonate`,
  async (args: EthDonateArgs, { dispatch }) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };

    try {
      const pwindow = window as ProviderWindow;

      updateTx({ step: Step.submit, message: "Submitting transaction.." });
      let provider: any;

      if (args.connectType === "metamask") {
        provider = new ethers.providers.Web3Provider(pwindow.ethereum!, "any");
      } else {
        provider = new ethers.providers.Web3Provider(pwindow.xfi?.ethereum!);
      }

      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      const chainNum = await signer.getChainId();
      const chainId = `${chainNum}` as chainIDs;
      const response = await signer.sendTransaction(args.tx!);

      updateTx({ step: Step.submit, message: "Saving donation info.." });
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
        step: Step.success,
        message: "Thank you for your donation!",
        txHash: response.hash,
        chainId,
        isReceiptEnabled: typeof receiver !== "undefined",
      });
    } catch (error) {
      handleEthError(error, updateTx);
    }
  }
);
