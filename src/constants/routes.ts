export enum appRoutes {
  auth_redirector = "/auth-redirector",
  marketplace = "/marketplace",
  leaderboard = "/leaderboard",
  admin = "/admin",
  applications = "/applications",
  banking_applications = "/banking-applications",
  register = "/register",
  signin = "/signin",
  signup = "/signup",
  profile = "/profile",
  donations = "/donations",
  donate = "/donate",
  donate_fiat_thanks = "/donate-fiat-thanks",
  stripe_payment_status = "/stripe-payment-status",
  donate_widget = "/donate-widget",
  gift = "/gift",
  recover_password = "/signin/recover",
  widget_config = "/widget-config",
}

export const adminRoutes = {
  index: "",
  edit_profile: "edit-profile",
  programs: "programs",
  program_editor: "program-editor",
  banking: "banking",
  widget_config: "widget-config",
  donations: "donations",
  members: "members",
} as const;

export enum donateWidgetRoutes {
  donate_fiat_thanks = "donate-fiat-thanks",
  stripe_payment_status = "stripe-payment-status",
}

export enum regRoutes {
  index = "",
  resume = "resume",
  success = "success",
  welcome = "welcome",
  steps = "steps",
  sign_notice = "sign-notice",
  sign_result = "sign-result",
}
