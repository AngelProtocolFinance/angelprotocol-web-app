import { ContractQueryTypes } from "./queryContract/types";

export const tags: ContractQueryTypes[] = [
  "registrar.config",
  "registrar.config-extension",

  "index-fund.funds",
  "index-fund.alliance-members",
  "index-fund.config",

  "gift-card.balance",

  "multisig.members",
  "multisig.proposals",
  "multisig.config",
  "multisig.proposal",
  "multisig.votes",
];

export const defaultProposalTags: ContractQueryTypes[] = [
  "multisig.proposals",
  "multisig.proposal",
];
