import { SummaryProps } from "../types";
import { InvestRequest } from "types/contracts";
import { EVMTx } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import { scaleToStr } from "helpers";
import { usdValue as _usdValue } from "helpers/coin-gecko";
import { estimateEVMFee } from "helpers/tx/estimateTx/estimateEVMfee";
import crossChainFeeFn from "./crossChainFee";

type EstimateItem = {
  name: string;
  amount: number;
  prettyAmount: string;
};

export type InvestEstimate = {
  tx: EVMTx;
  items: EstimateItem[];
};

export async function estimateInvest(
  endowId: number,
  multisig: string,
  wallet: WalletState,
  params: SummaryProps
): Promise<InvestEstimate | null> {
  const crossChainFee = await crossChainFeeFn(params);
  if (!crossChainFee) return null;

  const { token, strategy_key, type } = params;

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

  const { fee, tx: estimatedTx } = await estimateEVMFee(
    wallet,
    createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      destination: dest,
      value: "0",
      data,
      meta: meta.encoded,
    })
  );

  console.log({ fee });

  return { tx: estimatedTx.val as EVMTx, items: [] };
}
