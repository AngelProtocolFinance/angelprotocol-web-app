export enum appRoutes {
  auth_redirector = "/auth-redirector",
  marketplace = "/marketplace",
  admin = "/admin",
  user_dashboard = "/dashboard",
  home = "/",
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
  reset_password = "/signin/reset",
  widget_config = "/widget-config",
  blog = "/blog",
  //legal
  privacy_policy = "/privacy-policy",
  terms_donors = "/terms-of-use",
  terms_nonprofits = "/terms-of-use-npo",
  //informational
  nonprofit_info = "/nonprofit",
  donor_info = "/donor",
}

export const adminRoutes = {
  index: "",
  edit_profile: "edit-profile",
  programs: "programs",
  program_editor: "program-editor",
  banking: "banking",
  widget_config: "widget-config",
  donations: "donations",
  settings: "settings",
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
