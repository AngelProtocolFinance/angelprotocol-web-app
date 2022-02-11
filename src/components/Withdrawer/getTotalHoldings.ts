import { Dec } from "@terra-money/terra.js";
import { Holding } from "services/terra/account/types";
import { ExchangeMap } from "services/terra/vaults/types";

export default function getTotalHoldings(
  holdings: Holding[],
  rates: ExchangeMap
) {
  const total_dec = holdings.reduce(
    (total, holding) =>
      //NOTE: having fallback "0" is for instances where account page is a testnet endowment, then suddenly user disconnected
      //making the chainID to be `mainnet` vice versa, thus having mismatch in holdings and exchange rates
      //the querier won't know the difference since same endowment address applies regardless of chainID
      total.add(new Dec(holding.amount).mul(rates[holding.address] || "0")),
    new Dec(0)
  );
  return total_dec.div(1e6).toNumber();
}
