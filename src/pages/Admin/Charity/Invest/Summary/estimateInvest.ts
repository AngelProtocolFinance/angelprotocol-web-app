import Decimal from "decimal.js";
import { InvestFormValues } from "../types";
import { AWSstrategy } from "types/aws";
import { InvestRequest } from "types/contracts";
import { EVMTx } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import { humanize, scaleToStr } from "helpers";
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
};

export async function estimateInvest(
  endowId: number,
  multisig: string,
  wallet: WalletState,
  fv: InvestFormValues,
  strategy: AWSstrategy
): Promise<InvestEstimate | EstimateErrror> {
  try {
    const crossChainFee = await crossChainFeeFn(fv.token, strategy);
    if (!crossChainFee) return { error: "Failed to estimate cross chain fee" };

    const crossChainFeeItem: EstimateItem = {
      name: "Cross chain fee",
      amount: crossChainFee.amount,
      prettyAmount: prettyAmount(crossChainFee.amount, fv.token.symbol),
    };

    const amountItem: EstimateItem = {
      name: "Invested amount",
      amount: +fv.token.amount,
      prettyAmount: prettyAmount(+fv.token.amount, fv.token.symbol),
    };

    const totalAmount = new Decimal(fv.token.amount).add(crossChainFee.amount);

    const totalAmountItem: EstimateItem = {
      name: "Total amount",
      amount: totalAmount.toNumber(),
      prettyAmount: prettyAmount(totalAmount.toNumber(), fv.token.symbol),
    };

    if (totalAmount.gt(fv.token.balance)) {
      return {
        error: `Not enough balance: ( ${prettyAmount(
          fv.token.balance,
          fv.token.symbol
        )} ) to pay for fees.`,
      };
    }

    const scaledAmount = scaleToStr(fv.token.amount, fv.token.decimals);

    const investRequest: InvestRequest = {
      strategy: strategy.strategy_key,
      token: fv.token.symbol,
      lockAmt: fv.accountType === "locked" ? scaledAmount : "0",
      liquidAmt: fv.accountType === "liquid" ? scaledAmount : "0",
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

    return {
      tx: estimatedTx.val as EVMTx,
      items: [amountItem, txFeeItem, crossChainFeeItem, totalAmountItem],
    };
  } catch (err) {
    console.log(err);
    return { error: "Simulation failed. Transaction is likely to fail." };
  }
}

const prettyAmount = (amount: number, symbol: string) =>
  `${humanize(amount, 4)} ${symbol}`;
