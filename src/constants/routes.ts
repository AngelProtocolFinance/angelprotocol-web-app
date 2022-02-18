export enum web {
  index = "",
  charities = "for-charities",
  privacy = "privacy-policy",
  donors = "for-donors",
  about = "about",
  contact = "contact",
}

export enum site {
  home = "/",
  app = "/app",
}

export enum admin {
  index = "",
  index_fund_management = "index-fund",
  endowments = "endowments",
  alliance_members = "alliance-members",
  charity_applications = "charity-applications",
  proposal_types = "proposal-types",
}

export enum proposal_types {
  admin_add_member = "admin-add-member",
  admin_remove_member = "admin-remove-member",
}

export enum app {
  index = "/",
  dashboard = "dashboard",
  marketplace = "marketplace",
  leaderboard = "leaderboard",
  admin = "admin",
  register = "register",
  login = "login",
  unsdgs = "unsdgs",
  charity = "charity",
  charity_edit = "charity-edit",
  tca = "tca",
  fund = "fund",
  govern = "govern",
  auction = "auction",
  endowment = "endowment",
}

export enum govern {
  index = "",
  poll = "poll",
}

export enum charity {
  overview = "/overview",
  endowment = "/endowment",
  programs = "/programs",
  media = "/media",
  governance = "/governance",
}

export type Handler = () => void;
