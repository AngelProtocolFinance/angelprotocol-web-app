import Decimal from "decimal.js";
import { SummaryProps } from "../types";
import { InvestRequest } from "types/contracts";
import { EVMTx } from "types/evm";
import { TxMeta } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import { humanize, scaleToStr } from "helpers";
import { usdValue as _usdValue } from "helpers/coin-gecko";
import { estimateEVMFee } from "helpers/tx/estimateTx/estimateEVMfee";
import crossChainFeeFn from "./crossChainFee";

type EstimateItem = {
  name: string;
  amount: number;
  prettyAmount: string;
};

export type EstimateErrror = { error: string };

export type InvestEstimate = {
  tx: EVMTx;
  items: EstimateItem[];
  noProceedsLeft?: boolean;
};

export async function estimateInvest(
  endowId: number,
  multisig: string,
  wallet: WalletState,
  params: SummaryProps
): Promise<InvestEstimate | EstimateErrror> {
  try {
    const crossChainFee = await crossChainFeeFn(params);
    if (!crossChainFee) return { error: "Failed to estimate cross chain fee" };

    const { token, strategy_key, type } = params;

    const crossChainFeeItem: EstimateItem = {
      name: "Cross chain fee",
      amount: crossChainFee.amount,
      prettyAmount: prettyAmount(crossChainFee.amount, token.symbol),
    };

    const amountItem: EstimateItem = {
      name: "Amount",
      amount: +token.amount,
      prettyAmount: prettyAmount(+token.amount, token.symbol),
    };

    const scaledAmount = scaleToStr(token.amount, token.decimals);

    const investRequest: InvestRequest = {
      strategy: strategy_key,
      token: token.symbol,
      lockAmt: type === "locked" ? scaledAmount : "0",
      liquidAmt: type === "liquid" ? scaledAmount : "0",
      gasFee: crossChainFee.scaled,
    };

    const [data, dest, meta] = encodeTx(
      "accounts.invest-v2",
      {
        id: endowId,
        investRequest,
      },
      {
        title: "Invest",
        description: `Invest funds to strategy:${investRequest.strategy}`,
        content: null,
      }
    );

    const { fee: txFee, tx: estimatedTx } = await estimateEVMFee(
      wallet,
      createTx(wallet.address, "multisig.submit-transaction", {
        multisig,
        destination: dest,
        value: "0",
        data,
        meta: meta.encoded,
      })
    );

    const txFeeItem: EstimateItem = {
      name: "Transaction fee",
      amount: txFee.amount,
      prettyAmount: prettyAmount(txFee.amount, txFee.symbol),
    };

    const toReceive = new Decimal(token.amount).sub(crossChainFee.amount);

    const toReceiveItem: EstimateItem = {
      name: "Estimated proceeds",
      amount: toReceive.toNumber(),
      prettyAmount: prettyAmount(toReceive.toNumber(), token.symbol),
    };

    return {
      noProceedsLeft: toReceive.lt(0),
      tx: estimatedTx.val as EVMTx,
      items: [amountItem, txFeeItem, crossChainFeeItem, toReceiveItem],
    };
  } catch (err) {
    return { error: "Simulation failed. Transaction is likely to fail." };
  }
}

const prettyAmount = (amount: number, symbol: string) =>
  `${humanize(amount, 4)} ${symbol}`;
