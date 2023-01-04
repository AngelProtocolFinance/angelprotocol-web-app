import { createAsyncThunk } from "@reduxjs/toolkit";
import ERC20Abi from "abi/ERC20.json";
import { Estimate, TxStatus } from "../types";
import { DonateArgs } from "../types";
import { KYCData } from "types/aws";
import { EVMContract, TransactionResponse, Web3Provider } from "types/evm";
import { TokenWithAmount } from "types/slices";
import { apesTags, invalidateApesTags } from "services/apes";
import { getProvider, logger } from "helpers";
import { chains } from "constants/chainsV2";
import donation, { setTxStatus } from "../donation";
import logDonation from "./logDonation";

export const sendDonation = createAsyncThunk<void, DonateArgs>(
  `${donation.name}/sendDonation`,
  async ({ estimate, donation: { details, kyc, recipient } }, { dispatch }) => {
    const updateTx = (status: TxStatus) => {
      dispatch(setTxStatus(status));
    };

    try {
      const { wallet } = estimate;
      const chain = chains[wallet.chainId];
      const { token, pctLiquidSplit } = details;
      updateTx({ loadingMsg: "Payment is being processed..." });

      const { isSuccess, hash } = await sendTransaction(estimate, token);

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
                country: kyc.country.name,
                consent_tax: true,
                consent_marketing: true,
              };

        updateTx({
          loadingMsg:
            kyc !== "skipped"
              ? "Requesting receipt.."
              : "Saving donation details",
        });

        await logDonation({
          ...kycData /** receipt is sent to user if kyc is provider upfront */,
          amount: +token.amount,
          chainId: wallet.chainId,
          chainName: chain.name,
          charityName: recipient.name,
          denomination: token.symbol,
          splitLiq: pctLiquidSplit,
          transactionId: hash,
          transactionDate: new Date().toISOString(),
          walletAddress: wallet.address,
          endowmentId: recipient.id,
        });

        updateTx({ hash });

        //invalidate cache entries
        dispatch(
          invalidateApesTags([
            { type: apesTags.chain }, //user balance
            { type: apesTags.donations }, //donation logs
          ])
        );
      } else {
        updateTx("error");
      }
    } catch (err) {
      logger.error(err);
      updateTx("error");
    }
  }
);

async function sendTransaction(
  { wallet, type, tx }: Estimate,
  token: TokenWithAmount
): Promise<{ hash: string; isSuccess: boolean }> {
  switch (type) {
    case "cosmos": {
      const response = await wallet.client.signAndBroadcast(
        wallet.address,
        tx.msgs,
        tx.fee
      );
      return { hash: response.transactionHash, isSuccess: !response.code };
    }
    case "terra": {
      const response = await wallet.post(tx);
      return { hash: response.result.txhash, isSuccess: response.success };
    }
    //evm donations
    default: {
      const provider = new Web3Provider(getProvider(wallet.id) as any);
      const signer = provider.getSigner();
      let response: TransactionResponse;
      if (token.type === "evm-native") {
        response = await signer.sendTransaction(tx);
      } else {
        const ER20Contract: any = new EVMContract(
          token.token_id,
          ERC20Abi,
          signer
        );
        response = await ER20Contract.transfer(tx.to, tx.value);
      }
      return {
        hash: response.hash,
        isSuccess: true /** just set to true, let top catch handle eth error */,
      };
    }
  }
}
