export enum site {
  home = "/",
  app = "/app",
}

export enum web {
  index = "",
  charities = "for-charities",
  privacy = "privacy-policy",
  donors = "for-donors",
  about = "about",
  contact = "contact",
}

export enum app {
  index = "/",
  dashboard = "dashboard",
  charities = "charities",
  register = "register",
  login = "login",
  unsdgs = "unsdgs",
  charity = "charity",
  tca = "tca",
  fund = "fund",
  board_tca = "tca-leaderboard",
}

export enum register {
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
}

export type Handler = () => void;
