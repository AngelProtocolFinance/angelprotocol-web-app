export enum appRoutes {
  marketplace = "/marketplace",
  admin = "/admin",
  user_dashboard = "/dashboard",
  home = "/",
  applications = "/applications",
  banking_applications = "/banking-applications",
  register = "/register",
  signin = "/login",
  signup = "/signup",
  profile = "/profile",
  donate = "/donate",
  donate_thanks = "/donate-thanks",
  stripe_payment_status = "/stripe-payment-status",
  donate_widget = "/donate-widget",
  reset_password = "/login/reset",
  form_builder = "/form-builder",
  blog = "/blog",
  //legal
  privacy_policy = "/privacy-policy",
  terms_donors = "/terms-of-use",
  terms_nonprofits = "/terms-of-use-npo",
  //informational
  nonprofit_info = "/nonprofit",
  donor_info = "/donor",
  wp_plugin = "/wp-plugin",
  about = "/about-us",
}

export const adminRoutes = {
  dashboard: "dashboard",
  edit_profile: "edit-profile",
  programs: "programs",
  program_editor: "program-editor",
  banking: "banking",
  form_builder: "form-builder",
  donations: "donations",
  settings: "settings",
  members: "members",
  media: "media",
} as const;

export enum donateWidgetRoutes {
  donate_thanks = "donate-thanks",
  stripe_payment_status = "stripe-payment-status",
}

export enum regRoutes {
  index = "",
  resume = "resume",
  success = "success",
  welcome = "welcome",
  sign_notice = "sign-notice",
  sign_result = "sign-result",
}

export const authRoutes: string[] = [
  appRoutes.signin,
  appRoutes.signup,
  appRoutes.reset_password,
];
