import { TransactionResponse } from "@ethersproject/abstract-provider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { WalletController } from "@terra-money/wallet-provider";
import { chainOptions } from "App/chainOptions";
import ERC20Abi from "abi/ERC20.json";
import { ethers } from "ethers";
import { DonateArgs, EstimatedTx, StageUpdater } from "../../types";
import { KYCData } from "types/aws";
import { apesTags, invalidateApesTags } from "services/apes";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { TokenWithAmount } from "slices/donation";
import logDonation from "slices/transaction/logDonation";
import Contract from "contracts/Contract";
import { getProvider } from "helpers";
import handleTxError from "../../handleTxError";
import transactionSlice, { setStage } from "../../transactionSlice";
import handleEthError from "./handleEthError";

export const sendDonation = createAsyncThunk<void, DonateArgs>(
  `${transactionSlice.name}/junoDonate`,
  async (
    { wallet, tx, donation: { details, kyc, recipient } },
    { dispatch }
  ) => {
    const updateStage: StageUpdater = (update) => {
      dispatch(setStage(update));
    };
    try {
      const { token, pctLiquidSplit } = details;
      const { isSuccess, hash } = await sendTransaction(tx, wallet, token);

      if (isSuccess) {
        const kycData: KYCData | undefined =
          kyc === "skipped"
            ? undefined
            : {
                fullName: `${kyc.name.first} ${kyc.name.last}`,
                email: kyc.email,
                streetAddress: `${kyc.address.street} ${kyc.address.complement}`,
                city: kyc.city,
                state: kyc.state,
                zipCode: kyc.postalCode,
                country: kyc.country,
                consent_tax: true,
                consent_marketing: true,
              };
        updateStage({
          step: "submit",
          message:
            kyc !== "skipped"
              ? "Requesting receipt.."
              : "Saving donation details",
        });

        await logDonation({
          ...kycData /** receipt is sent to user if kyc is provider upfront */,
          transactionId: hash,
          transactionDate: new Date().toISOString(),
          chainId: wallet.chain.chain_id,
          amount: +token.amount,
          denomination: token.symbol,
          splitLiq: `${+pctLiquidSplit / 100}`,
          walletAddress: wallet.address,
          charityId: recipient.id,
        });

        //invalidate cache entries
        dispatch(
          invalidateApesTags([
            { type: apesTags.chain }, //user balance
            { type: apesTags.donations }, //donation logs
          ])
        );
      } else {
        updateStage({
          step: "error",
          message: "Transaction failed",
          txHash: hash,
          chainId: wallet.chain.chain_id,
        });
      }
    } catch (err) {
      switch (tx.type) {
        case "cosmos":
        case "terra":
          handleTxError(err, updateStage);
          break;
        default:
          handleEthError(err, updateStage);
      }
    }
  }
);

async function sendTransaction(
  tx: EstimatedTx,
  wallet: WalletState,
  token: TokenWithAmount
): Promise<{ hash: string; isSuccess: boolean }> {
  switch (tx.type) {
    case "cosmos": {
      const contract = new Contract(wallet);
      const response = await contract.signAndBroadcast(tx.val);
      return { hash: response.transactionHash, isSuccess: !response.code };
    }
    case "terra": {
      const response = await controller.post(tx.val, wallet.address);
      return { hash: response.result.txhash, isSuccess: response.success };
    }
    //evm donations
    default: {
      const provider = new ethers.providers.Web3Provider(
        getProvider(wallet.providerId) as any
      );
      const signer = provider.getSigner();
      let response: TransactionResponse;
      if (wallet.chain.native_currency.token_id === token.token_id) {
        response = await signer.sendTransaction(tx.val);
      } else {
        const ER20Contract: any = new ethers.Contract(
          token.token_id,
          ERC20Abi,
          signer
        );
        response = await ER20Contract.transfer(tx.val.to, tx.val.value);
      }
      return {
        hash: response.hash,
        isSuccess: true /** just set to true, let top catch handle eth error */,
      };
    }
  }
}

const controller = new WalletController(chainOptions);
