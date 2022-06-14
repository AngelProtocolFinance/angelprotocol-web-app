import { TerraTags } from "services/types";

export const terraTags: { [key in TerraTags]: string } = {
  gov: "gov",
  admin: "admin",
  indexfund: "indexfund",
  multicall: "multicall",
  endowment: "endowment",
  registrar: "registrar",
};

export enum adminTags {
  registration = "registration",
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
  endowments = "endowments",
  config = "config",
}

export enum endowmentTags {
  profile = "profile",
}

export enum multicallTags {
  endowmentBalance = "endowmentBalance",
  airdrop = "airdrop",
  terraBalances = "terraBalances",
}
