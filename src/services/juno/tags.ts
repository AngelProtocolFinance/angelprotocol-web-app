import { ContractQueryTypes } from "./queryContract/types";

export const tags: ContractQueryTypes[] = [
  "registrar.config",

  "index-fund.config",
  "index-fund.fund",

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
