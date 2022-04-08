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

export const enum proposalTypes {
  index = "",
  //index fund
  indexFund_allianceEdits = "indexfund-alliance-edit",
  indexFund_createFund = "indexfund-create-fund",
  indexFund_removeFund = "indexfund-remove-fund",
  indexFund_updateFundMembers = "indexfund-update-fund-members",
  indexFund_configUpdate = "indexfund-config-update",
  //admin group
  adminGroup_updateMembers = "admin-group-update-members",
  adminGroup_updateCW3Config = "admin-group-update-cw3-config",
  adminGroup_fundTransfer = "admin-group-fund-transfer",
  //endowment
  endowment_updateStatus = "endowment-update-status",
  endowment_withdraw = "endowment-withdraw",

  //registrar
  registrar_updateConfig = "registrar-update-config",
  registrar_updateOwner = "registrar-update-owner",
}
