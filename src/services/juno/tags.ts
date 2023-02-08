import { FullTagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export const rootTags = [
  "gov",
  "admin",
  "indexfund",
  "account",
  "registrar",
  "custom",
] as const;

type JunoTag = typeof rootTags[number];

export enum adminTags {
  proposals = "proposals",
  proposal = "proposal",
  members = "members",
  member = "member",
  config = "config",
  votes = "votes",
  voter = "voter",
  voters = "voters",
  applications = "applications",
}

export enum govTags {
  polls = "polls",
  state = "state",
  staker = "staker",
  config = "config",
  halo_balance = "halo_balance",
  halo_info = "halo_info",
}

export enum indexfundTags {
  alliance_members = "alliance_members",
  fund_list = "fund_list",
  config = "config",
}

export enum registrarTags {
  config = "config",
  vault_list = "vault-list",
}

export enum accountTags {
  endowment = "endowment",
  endowments = "endowments",
  profile = "profile",
  balance = "balance",
}

export const defaultProposalTags: FullTagDescription<JunoTag>[] = [
  //basic tags to invalidate
  { type: "admin", id: adminTags.proposals },
  { type: "admin", id: adminTags.votes },
];
