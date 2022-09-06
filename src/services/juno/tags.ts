import { JunoTags } from "services/types";

export const junoTags: { [key in JunoTags]: string } = {
  gov: "gov",
  admin: "admin",
  indexfund: "indexfund",
  account: "account",
  registrar: "registrar",
  custom: "custom",
};

export enum adminTags {
  proposals = "proposals",
  proposal = "proposal",
  members = "members",
  member = "member",
  config = "config",
  votes = "votes",
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
}

export enum accountTags {
  endowments = "endowments",
  profile = "profile",
  balance = "balance",
}

export enum customTags {
  isMember,
  adminResources,
  proposalDetails,
}
