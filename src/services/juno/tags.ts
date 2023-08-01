import { ContractQueryTypes } from "./queryContract/types";

export const tags: ContractQueryTypes[] = [
  "registrar.config",

  "index-fund.config",
  "index-fund.fund",

  "gift-card.balance",

  "erc20.balance",

  "multisig.members",
  "multisig.is-owner",
  "multisig.tx-count",
  "multisig.tx-duration",
  "multisig.threshold",
  "multisig.require-execution",
  "multisig.votes",

  "multisig/review.prop-confirms",
  "multisig/review.proposal",

  "accounts.endowment",
  "accounts.state",
  "accounts.token-balance",
];

export type EVMTag = typeof tags[number];
