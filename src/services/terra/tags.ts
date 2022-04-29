import { TerraTags } from "@types-services/terra";

export const terraTags: { [key in TerraTags]: string } = {
  gov: "gov",
  admin: "admin",
  endowment: "endowment",
  halo: "halo",
  indexfund: "indexfund",
  lbp: "lbp",
  multicall: "multicall",
  registrar: "registrar",
  user: "user",
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

export enum userTags {
  terra_balance = "terra_balance",
  halo_balance = "halo_balance",
}
export enum haloTags {
  info = "info",
}

export enum endowmentTags {
  holdings = "holdings",
  rate = "rate",
  profile = "profile",
}

export enum multicallTags {
  endowmentBalance = "endowmentBalance",
  airdrops = "airdrop",
}
