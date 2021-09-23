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
  privacy_policy = "/privacy-policy",
  charities = "/for-charities",
  donors = "/for-donors",
}

export enum registerRoutes {
  index = "",
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
