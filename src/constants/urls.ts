import { BASE_URL, env } from "./env";

export const APIs = {
  aws: "https://ap-api.better.giving",
  apes: `https://apes-api.better.giving/${env}`,
  wordpress: "https://angelgiving.10web.site/wp-json/wp/v2",
  nodeProxy: "https://59vigz9r91.execute-api.us-east-1.amazonaws.com",
  coingecko: "https://api.coingecko.com",
};

export const PRIVACY_POLICY = `${BASE_URL}/privacy-policy/`;
export const TERMS_OF_USE_NPO = `${BASE_URL}/terms-of-use-npo/`;
export const TERMS_OF_USE_DONOR = `${BASE_URL}/terms-of-use/`;
export const guidestar = {
  seal: "https://widgets.guidestar.org/TransparencySeal/87-3758939",
  profile:
    "https://www.guidestar.org/profile/shared/5f73977b-cb21-4973-852e-cdfa5c6ee7a5",
};
