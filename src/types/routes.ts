export enum site {
  home = "/",
  app = "/app",
  test = "/test",
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
  register = "register",
  login = "login",
  unsdgs = "unsdgs",
  donate = "donate",
  tca = "tca",
  fund = "fund",
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

export enum routes {
  home = "/",
  login = "/login",
  register = "/register",
  about = "/about",
  about_unsdgs = "/about-unsdgs",
  dashboard = "/dashboard",
  donate = "/donate",
  contact = "/contact",
  tca = "/tca",
  test = "/test",
}

export type Handler = () => void;
