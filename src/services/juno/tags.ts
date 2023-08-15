import { ContractQueryTypes } from "./queryContract/types";

const contractTags: ContractQueryTypes[] = [
  "registrar.config",

  "index-fund.config",
  "index-fund.fund",

  "gift-card.balance",

  "erc20.balance",

  "multisig/review.prop-confirms",
  "multisig/review.proposal",

  "accounts.endowment",
  "accounts.state",
  "accounts.token-balance",
];

const customTags = ["multisig-subgraph"] as const;

export const tags = [...contractTags, ...customTags];

export type EVMTag = (typeof tags)[number];
