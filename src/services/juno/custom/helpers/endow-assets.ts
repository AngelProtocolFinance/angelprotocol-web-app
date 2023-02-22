import { AssetSummary, Vault } from "services/types";
import { AccountType, BalanceInfo, YieldVault } from "types/contracts";
import { condenseToNum } from "helpers";
import { IS_TEST } from "constants/env";
import { denoms, symbols } from "constants/tokens";

export type BalMap = { [index: string]: number | undefined };

const summarizer =
  (vaults: YieldVault[], balMap: BalMap, accTOH: BalanceInfo) =>
  (type: AccountType): AssetSummary => {
    const denom = IS_TEST ? denoms.ujunox : denoms.axlusdc;
    const coin = accTOH[type].native.find((t) => t.denom === denom) || {
      denom,
      amount: "0",
    };

    const liqs: Vault[] = [];
    const locks: Vault[] = [];

    let investedLiq = 0;
    let investedLocked = 0;

    for (const v of vaults) {
      const bal = balMap[v.address] || 0;
      const vault = {
        ...v,
        invested: bal,
        balance: balMap[v.input_denom] || 0,
        symbol: symbols[v.input_denom],
      };

      if (v.acct_type === "liquid") {
        liqs.push(vault);
        investedLiq += bal;
      } else {
        locks.push(vault);
        investedLocked += bal;
      }
    }
    const invested = type === "liquid" ? investedLiq : investedLocked;

    const free = condenseToNum(coin.amount);
    const total = free + invested;

    return {
      free,
      invested,
      total,
      symbol: symbols[denom],
      vaults: type === "liquid" ? liqs : locks,
    };
  };

export default summarizer;
