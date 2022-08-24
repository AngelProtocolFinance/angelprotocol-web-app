import {
  TransactionRequest,
  TransactionResponse,
} from "@ethersproject/abstract-provider/src.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ERC20Abi from "abi/ERC20.json";
import { ethers } from "ethers";
import { StageUpdater } from "slices/transaction/types";
import { Receiver } from "types/server/aws";
import { VerifiedChain } from "contexts/ChainGuard";
import { DonateValues } from "components/Transactors/Donater";
import { getProvider } from "helpers";
import logDonation from "../../logDonation";
import transactionSlice, { setStage } from "../../transactionSlice";
import handleEthError from "./handleEthError";

type EthDonateArgs = {
  chain: VerifiedChain;
  tx: TransactionRequest;
  donateValues: DonateValues;
};

export const sendEthDonation = createAsyncThunk(
  `${transactionSlice.name}/ethDonate`,
  async (args: EthDonateArgs, { dispatch }) => {
    const updateStage: StageUpdater = (update) => {
      dispatch(setStage(update));
    };

    try {
      updateStage({ step: "submit", message: "Submitting transaction.." });
      const provider = new ethers.providers.Web3Provider(
        //wallet is connected to send this tx
        getProvider(args.chain.wallet.id) as any
      );

      const signer = provider.getSigner();
      const { receiver, token, amount, split_liq } = args.donateValues;

      let response: TransactionResponse;
      if (args.chain.native_currency.token_id === token.token_id) {
        response = await signer.sendTransaction(args.tx);
      } else {
        const ER20Contract: any = new ethers.Contract(
          token.token_id,
          ERC20Abi,
          signer
        );
        response = await ER20Contract.transfer(args.tx.to, args.tx.value);
      }

      updateStage({ step: "submit", message: "Saving donation info.." });
      const receipient: Receiver =
        typeof receiver === "string"
          ? { charityId: receiver }
          : { fundId: receiver };

      if (typeof receiver !== "undefined") {
        await logDonation({
          ...receipient,
          transactionId: response.hash,
          transactionDate: new Date().toISOString(),
          chainId: args.chain.chain_id,
          amount: +amount,
          denomination: token.symbol,
          splitLiq: split_liq,
          walletAddress: args.chain.wallet.address,
        });
      }
      updateStage({
        step: "success",
        message: "Thank you for your donation!",
        txHash: response.hash,
        chain: args.chain,
        isShareEnabled: true,
      });
    } catch (error) {
      handleEthError(error, updateStage);
    }
  }
);
