import { useLogDonationMutation } from "services/apes/donations";
import { Receiver, TxLogPayload } from "services/apes/types";
import { chainIDs } from "constants/chainIDs";
import { currency_text, denoms } from "constants/currency";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

export default function useDonationLogger() {
  const [logTx] = useLogDonationMutation();

  const logDonation: DonationLogger = async (
    txhash,
    chainId,
    amount,
    denom,
    splitLiq,
    walletAddress,
    receipient
  ) => {
    let receiver: Receiver =
      typeof receipient === "string"
        ? { charityId: receipient }
        : { fundId: receipient };

    const txLogPayload: TxLogPayload = {
      ...receiver,
      transactionDate: new Date().toISOString(),
      transactionId: txhash,
      denomination: currency_text[denom],
      amount: parseFloat(amount),
      splitLiq,
      walletAddress,
      chainId,
    };
    return await logTx(txLogPayload);
  };

  return logDonation;
}

export type DonationLogger = (
  txhash: string,
  chainId: chainIDs,
  amount: string,
  denom: denoms,
  splitLiq: string,
  walletAddress: string,
  receipient: string | number
) => Promise<
  | {
      data: any;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    }
>;
