import { ContractQueryTypes } from "./queryContract/types";

export const tags: ContractQueryTypes[] = [
  "registrar.config",

  "index-fund.funds",
  "index-fund.alliance-members",
  "index-fund.config",

  "gift-card.balance",

  "erc20.balance",

  "multisig.members",
  "multisig.txs",
  "multisig.threshold",
  "multisig.require-execution",
  "multisig.transaction",
  "multisig.votes",

  "accounts.endowment",
  "accounts.state",
];

export const defaultProposalTags: ContractQueryTypes[] = [
  "multisig.txs",
  "multisig.transaction",
];
