import { IconType } from "react-icons";

export enum appRoutes {
  index = "/",
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
  donate_widget = "/donate-widget",
  gift = "/gift",
}

export enum governRoutes {
  index = "",
  pollDetails = "pollDetails",
}

export enum profileRoutes {
  overview = "overview",
  endowment = "endowment",
  programs = "programs",
  media = "media",
  governance = "governance",
}

export const adminRoutes = {
  index: { url: "" },
  proposal: { url: "proposal" },
  proposals: { url: "proposals" },
  templates: { url: "templates" },
  widget_config: { url: "widget-config" },
  edit_profile: { url: "edit-profile" },
  withdraws: { url: "withdraws" },
  settings: { url: "settings" },
  invest: { url: "invest-dashboard" },
} as const;
