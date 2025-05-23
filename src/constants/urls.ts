import { BASE_URL, INTERCOM_HELP, env } from "./env";

export const APIs = {
  apes: `https://apes-api.better.giving/${env}`,
  aws: "https://ap-api.better.giving",
  coingecko: "https://api.coingecko.com",
  hubspotForms:
    "https://api.hsforms.com/submissions/v3/integration/secure/submit",
  nodeProxy: "https://59vigz9r91.execute-api.us-east-1.amazonaws.com",
  wordpress: "https://angelgiving.10web.site/wp-json/wp/v2",
};

export const PRIVACY_POLICY = `${BASE_URL}/privacy-policy/`;
export const TERMS_OF_USE_NPO = `${BASE_URL}/terms-of-use-npo/`;
export const TERMS_OF_USE_DONOR = `${BASE_URL}/terms-of-use/`;
export const guidestar = {
  seal: "https://widgets.guidestar.org/TransparencySeal/87-3758939",
  profile:
    "https://www.guidestar.org/profile/shared/5f73977b-cb21-4973-852e-cdfa5c6ee7a5",
};

export const socials = {
  facebook: "https://www.facebook.com/BetterGivingFB/",
  instagram: "https://www.instagram.com/better.giving",
  linkedin: "https://www.linkedin.com/company/better-giving/",
  x: "https://x.com/BetterDotGiving",
  youtube: "https://www.youtube.com/@BetterDotGiving",
  intercom: INTERCOM_HELP,
};
