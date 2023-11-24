export enum appRoutes {
  auth_redirector = "/auth-redirector",
  marketplace = "/marketplace",
  leaderboard = "/leaderboard",
  admin = "/admin",
  applications = "/applications",
  register = "/register",
  signin = "/signin",
  profile = "/profile",
  donations = "/donations",
  donate = "/donate",
  donate_fiat_thanks = "/donate-fiat-thanks",
  donate_widget = "/donate-widget",
  gift = "/gift",
}

export const adminRoutes = {
  index: "",
  edit_profile: "edit-profile",
  programs: "programs",
  program_editor: "program-editor",
  banking: "banking",
  widget_config: "widget-config",
  donations: "donations",
} as const;
