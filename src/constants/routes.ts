import { href } from "react-router";

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
  funds: "funds",
  integrations: "integrations",
  referrals: "referrals",
  savings: "savings",
  investments: "investments",
} as const;

export enum donate_widget_routes {
  donate_thanks = "donate-thanks",
  stripe_payment_status = "stripe-payment-status",
}

export enum reg_routes {
  index = "",
  resume = "resume",
  success = "success",
  welcome = "welcome",
  sign_notice = "sign-notice",
  sign_result = "sign-result",
}

export const auth_routes: string[] = [
  href("/login"),
  href("/signup"),
  href("/login/reset"),
];
