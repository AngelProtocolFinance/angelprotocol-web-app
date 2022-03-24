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
  endowment_admin = "endowment-admin",
  donations = "donations",
}

export enum govern {
  index = "",
  pollDetails = "pollDetails",
}

export enum charity {
  index = "",
  endowment = "endowment",
  programs = "programs",
  media = "media",
  governance = "governance",
}

export enum admin {
  index = "",
  charity_applications = "charity-applications",
  proposal = "proposal",
  proposals = "proposals",
  proposal_types = "proposal-types",
}

export enum proposal_types {
  index = "",
  //apCW4
  admin_update_members = "admin-update-members",
  //endowments
  change_endowment_status = "change-endowment-status",
  //index_fund
  create_fund = "create-fund",
  destroy_fund = "destroy-fund",
  update_fund = "update-fund",
  alliance_members = "alliance-members",
}
