import { IconType } from "components/Icon";

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

const _routes = [
  "index",
  "proposal",
  "proposals",
  "templates",
  "edit_profile",
  "widget_config",
  "withdraws",
  "settings",
  "invest",
] as const;

export type AdminRoutes = typeof _routes[number];
type AdminRoute = {
  url: string;
  // title: string;
  // icon: { type: IconType; size: number };
};
export const adminRoutes: { [key in AdminRoutes]: AdminRoute } = {
  //all
  index: { url: "" },
  proposal: { url: "proposal" },
  proposals: { url: "proposals" },
  templates: { url: "templates" },

  //npo | aif
  edit_profile: { url: "edit-profile" },

  //npo
  widget_config: { url: "widget-config" },
  withdraws: { url: "withdraws" },
  settings: { url: "settings" },
  invest: { url: "invest-dashboard" },
};
