export enum site {
  home = "/",
  app = "/app",
  admin = "/admin",
}

export enum web {
  index = "",
  charities = "for-charities",
  privacy = "privacy-policy",
  donors = "for-donors",
  about = "about",
  contact = "contact",
}

export enum admin {
  index = "/",
  index_fund_management = "index-fund",
  endowments = "endowments",
  aliance_members = "aliance-members",
  charity_applications = "charity-applications",
}

export enum app {
  index = "/",
  dashboard = "dashboard",
  charities = "charities",
  marketplace = "marketplace",
  register = "register",
  login = "login",
  unsdgs = "unsdgs",
  charity = "charity",
  tca = "tca",
  fund = "fund",
  board_tca = "tca-leaderboard",
  withdraw = "withdraw",
  govern = "govern",
  test = "test",
}

export enum registration {
  index = "/",
  detail = "detail",
  confirm = "confirm",
  verify = "verify/:token",
  status = "status",
  wallet_check = "wallet-check",
  connect_wallet = "connect-wallet",
  select_wallet = "select-wallet",
  upload_docs = "upload-docs",
  charity_profile = "charity-profile",
  others = "others",
  self_custody = "self-custody",
  key_person = "key-person",
}

export type Handler = () => void;
