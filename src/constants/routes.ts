export enum appRoutes {
  dashboard = "/dashboard",
  marketplace = "/marketplace",
  leaderboard = "/leaderboard",
  admin = "/admin",
  register = "/register",
  login = "/login",
  unsdgs = "/unsdgs",
  profile = "/profile",
  tca = "/tca",
  fund = "/fund",
  govern = "/govern",
  endowment_admin = "/endowment-admin",
  donations = "/donations",
  donate = "/donate",
  donate_fiat_thanks = "/donate-fiat-thanks",
  donate_widget = "/donate-widget",
  gift = "/gift",
}

export const adminRoutes = {
  //base routes
  index_review: "",
  index: "",
  proposal: "proposal",
  proposals: "proposals",
  templates: "templates",
  widget_config: "widget-config",
  contributions: "contributions",
  contributor_verification: "contributor-verification",
  permissions: "permissions",
  whitelists: "whitelists",
  admin_wallet: "admin-wallet",
  //charity
  edit_profile: "edit-profile",
  withdraws: "withdraws",
  deposits: "deposits",
  // settings: "settings",
  invest: "invest-dashboard",
  account: "account",

  application: "application",
} as const;
