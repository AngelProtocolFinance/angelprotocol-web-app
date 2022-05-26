import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { Receiver } from "types/server/aws";
import { getProvider } from "contexts/WalletContext/helpers/getProvider";
import { ProviderId } from "contexts/WalletContext/types";
import { DonateValues } from "components/Transactors/Donater";
import { StageUpdator } from "slices/transaction/types";
import handleEthError from "helpers/handleEthError";
import logDonation from "helpers/logDonation";
import transactionSlice, { setStage } from "../transactionSlice";

type EthDonateArgs = {
  providerId?: ProviderId;
  tx: TransactionRequest;
  donateValues: DonateValues;
};

export const sendEthDonation = createAsyncThunk(
  `${transactionSlice.name}/ethDonate`,
  async (args: EthDonateArgs, { dispatch }) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };

    try {
      updateTx({ step: "submit", message: "Submitting transaction.." });

      const provider = new ethers.providers.Web3Provider(
        //wallet is connected to send this tx
        getProvider(args.providerId!) as any
      );

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
