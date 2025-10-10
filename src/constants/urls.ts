import { BASE_URL, INTERCOM_HELP, env } from "./env";

export const APIs = {
  aws: "https://ap-api.better.giving",
  apes: `https://apes-api.better.giving/${env}`,
  wordpress: "https://angelgiving.10web.site/wp-json/wp/v2",
};

export const PRIVACY_POLICY = `${BASE_URL}/privacy-policy/`;
export const TERMS_OF_USE_NPO = `${BASE_URL}/terms-of-use-npo/`;
export const TERMS_OF_USE_DONOR = `${BASE_URL}/terms-of-use/`;
export const guidestar = {
  seal: "https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/14574957/svg",
  profile:
    "https://app.candid.org/profile/14574957/better-giving-inc-87-3758939",
};

export const socials = {
  facebook: "https://www.facebook.com/BetterGivingFB/",
  instagram: "https://www.instagram.com/better.giving",
  linkedin: "https://www.linkedin.com/company/better-giving/",
  x: "https://x.com/BetterDotGiving",
  youtube: "https://www.youtube.com/@BetterDotGiving",
  intercom: INTERCOM_HELP,
};

export const referrals_hub =
  "https://intercom.help/better-giving/en/collections/13341032-referral-program-resource-hub ";
