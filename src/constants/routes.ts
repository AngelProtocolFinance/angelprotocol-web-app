// import { IconType } from "components/Icon";

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
  //all
  "index",
  "proposal",
  "proposals",
  "templates",

  //npo | aif
  "edit_profile",

  //npo
  "widget_config",
  "withdraws",
  "settings",
  "invest",

  //ap
  "index_review",
] as const;

export type AdminRoutes = typeof _routes[number];
type AdminRoute = {
  url: string;
  title: string;
  // icon: { type: IconType; size: number };
};
export const adminRoutes: { [key in AdminRoutes]: AdminRoute } = {
  //all
  index: { url: "", title: "Dashboard" },
  proposal: { url: "proposal", title: "Proposal" },
  proposals: { url: "proposals", title: "Proposals" },
  templates: { url: "templates", title: "Templates" },

  //npo | aif
  edit_profile: { url: "edit-profile", title: "Edit Profile" },

  //npo
  widget_config: { url: "widget-config", title: "Widget Config" },
  withdraws: { url: "withdraws", title: "Withdraws" },
  settings: { url: "settings", title: "Settings" },
  invest: { url: "invest-dashboard", title: "Invest" },

  //ap
  index_review: { url: "", title: "Applications" },
};
