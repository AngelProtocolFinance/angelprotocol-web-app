import {
  TransactionRequest,
  TransactionResponse,
} from "@ethersproject/abstract-provider/src.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ERC20Abi from "abi/ERC20.json";
import { ethers } from "ethers";
import { ProviderId } from "contexts/WalletContext/types";
import { StageUpdator } from "slices/transaction/types";
import { KYCData, Receiver } from "types/server/aws";
import { DonateValues } from "components/Transactors/Donater";
import { getProvider } from "helpers/getProvider";
import handleEthError from "helpers/handleEthError";
import logDonation from "helpers/logDonation";
import transactionSlice, { setStage } from "../transactionSlice";

type EthDonateArgs = {
  providerId: ProviderId;
  tx: TransactionRequest;
  donateValues: DonateValues;
  kycData?: KYCData;
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
      const { contract_addr } = args.donateValues.token;

      let response: TransactionResponse;
      if (contract_addr) {
        const ER20Contract: any = new ethers.Contract(
          contract_addr,
          ERC20Abi,
          signer
        );
        response = await ER20Contract.transfer(args.tx.to, args.tx.value);
      } else {
        response = await signer.sendTransaction(args.tx);
      }

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
          kycData: args.kycData,
        });
      }
      updateTx({
        step: "success",
        message: "Thank you for your donation!",
        txHash: response.hash,
        chainId,
        isShareEnabled: true,
      });
    } catch (error) {
      console.error(error);
      handleEthError(error, updateTx);
    }
  }
);
