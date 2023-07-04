import { ContractQueryTypes } from "./queryContract/types";

export const tags: ContractQueryTypes[] = [
  "registrar.config",

  "index-fund.config",
  "index-fund.fund",

  "gift-card.balance",

  "erc20.balance",

  "multisig.members",
  "multisig.is-owner",
  "multisig.txs",
  "multisig.tx-count",
  "multisig.threshold",
  "multisig.require-execution",
  "multisig.transaction",
  "multisig.votes",

  "multisig/review.prop-confirms",
  "multisig/review.proposal",

  "accounts.endowment",
  "accounts.state",
  "accounts.token-balance",
];

export const defaultProposalTags: ContractQueryTypes[] = [
  "multisig.txs",
  "multisig.transaction",
];
