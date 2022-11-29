import {
  TransactionRequest,
  TransactionResponse,
} from "@ethersproject/abstract-provider/src.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ERC20Abi from "abi/ERC20.json";
import { ethers } from "ethers";
import { StageUpdater } from "slices/transaction/types";
import { apesTags, invalidateApesTags } from "services/apes";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { DonateValues } from "components/Transactors/Donater";
import { getProvider } from "helpers/evm";
import { WalletDisconnectedError } from "errors/errors";
import logDonation from "../../logDonation";
import transactionSlice, { setStage } from "../../transactionSlice";
import handleEthError from "./handleEthError";

type EthDonateArgs = {
  wallet?: WalletState;
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
      if (!args.wallet) throw new WalletDisconnectedError();
      updateStage({ step: "submit", message: "Submitting transaction.." });

      const provider = new ethers.providers.Web3Provider(
        //wallet is connected to send this tx
        getProvider(args.wallet.providerId) as any
      );

      const signer = provider.getSigner();

      const { charityId, token, amount, split_liq, kycData } =
        args.donateValues;

      let response: TransactionResponse;
      if (args.wallet.chain.native_currency.token_id === token.token_id) {
        response = await signer.sendTransaction(args.tx);
      } else {
        const ER20Contract: any = new ethers.Contract(
          token.token_id,
          ERC20Abi,
          signer
        );
        response = await ER20Contract.transfer(args.tx.to, args.tx.value);
      }

      dispatch(invalidateApesTags([{ type: apesTags.chain }]));

      updateStage({
        step: "submit",
        message: kycData ? "Requesting receipt.." : "Saving donation details",
      });

      await logDonation({
        transactionId: response.hash,
        transactionDate: new Date().toISOString(),
        chainId: args.wallet.chain.chain_id,
        amount: +amount,
        denomination: token.symbol,
        splitLiq: split_liq,
        walletAddress: args.wallet.address,
        charityId,
        chainName: args.wallet.chain.chain_name,
        charityName: args.donateValues.charityName,
      });

      updateStage({
        step: "success",
        message: "Thank you for your donation!",
        txHash: response.hash,
        chainId: args.wallet.chain.chain_id,
        isShareEnabled: true,
      });
    } catch (error) {
      handleEthError(error, updateStage);
    }
  }
);
