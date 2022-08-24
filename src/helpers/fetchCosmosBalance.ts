import { Coin } from "@cosmjs/proto-signing";
import { condenseToNum } from "./decimal";

export async function getCosmosBalance(
  denom: string,
  address: string,
  lcdUrl: string,
  decimals = 6
) {
  const { balance } = await fetch(
    `${lcdUrl}/cosmos/bank/v1beta1/balances/${address}/by_denom?=${denom}`
  ).then<{ balance: Coin }>((res) => res.json());
  return condenseToNum(balance.amount, decimals);
}
