import { ContractQueries } from "./types";

export const placeholders: {
  [K in Exclude<
    keyof ContractQueries,
    | "accounts.endowment"
    | "accounts.state"
    | "accounts.token-balance"
    | "multisig.members"
    | "erc20.balance"
    | "multisig.votes"
    | "multisig.threshold"
    | "multisig.require-execution"
    | "multisig.tx-count"
    | "multisig.transaction"
    | "multisig.txs"
    | "index-fund.funds"
    | "index-fund.config"
    | "index-fund.alliance-members"
    | "registrar.config"
  >]: ReturnType<ContractQueries[K]["transform"]>;
} = {
  "gift-card.balance": {
    native: "0",
  },
};
