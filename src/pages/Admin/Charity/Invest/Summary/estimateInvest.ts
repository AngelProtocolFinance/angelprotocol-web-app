import { EVMTx } from "types/evm";
import { TxContent } from "types/tx";
import { logger } from "helpers";
import { usdValue as _usdValue } from "helpers/coin-gecko";
import { estimateTx } from "helpers/tx";

type EstimateItem = {
  name: string;
  amount: number;
};

export type InvestEstimate = {
  tx: EVMTx;
  items: EstimateItem[];
};

export async function estimateInvest(): Promise<InvestEstimate | null> {
  let content: TxContent;
  // ///////////// GET TX CONTENT ///////////////
  try {
    // ///////////// ESTIMATE TX ///////////////
    const txEstimate = await estimateTx(content, wallet);
    if (!txEstimate) return null;

    // ///////////// Sucessful simulation ///////////////

    return {
      tx: txEstimate.tx,
      items: [amount, donationFee, transactionFee, total],
    };
  } catch (err) {
    logger.error(err);
    return null;
  }
}
