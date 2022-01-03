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
  admin = "/admin",
}

export enum admin {
  index = "dashboard",
  authentication = "authentication",
  index_fund_management = "index-fund",
  endowments = "endowments",
  alliance_members = "alliance-members",
  charity_applications = "charity-applications",
}

export enum app {
  index = "/",
  dashboard = "dashboard",
  charities = "charities",
  marketplace = "marketplace",
  leaderboard = "leaderboard",
  register = "register",
  login = "login",
  unsdgs = "unsdgs",
  charity = "charity",
  tca = "tca",
  fund = "fund",
  withdraw = "withdraw",
  govern = "govern",
  test = "test",
  auction = "auction",
}

export enum govern {
  index = "",
  poll = "poll",
}

export enum registration {
  index = "/",
  detail = "detail",
  confirm = "confirm",
  verify = "verify/:token",
  status = "status",
  wallet_check = "wallet-check",
  connect_wallet = "connect-wallet",
  register_wallet = "register-wallet",
  select_wallet = "select-wallet",
  upload_docs = "upload-docs",
  charity_profile = "charity-profile",
  others = "others",
  self_custody = "self-custody",
  key_person = "key-person",
}

export type Handler = () => void;
