import { BASE_URL, ENVIRONMENT, IS_TEST } from "./env";

export const APIs = {
  aws: "https://kpnxz5rzo2.execute-api.us-east-1.amazonaws.com",
  apes: `https://apes-api.better.giving/${ENVIRONMENT}`,
  wordpress: `https://angelgiving${
    IS_TEST ? "-dev" : ""
  }.10web.site/wp-json/wp/v2`,
};

export const LITEPAPER = `${BASE_URL}/docs/litepaper-introduction/`;
export const PRIVACY_POLICY = `${BASE_URL}/privacy-policy/`;

export const TERMS_OF_USE_NPO = `${BASE_URL}/terms-of-use-npo/`;
export const TERMS_OF_USE_DONOR = `${BASE_URL}/terms-of-use/`;
