import { BASE_URL, ENVIRONMENT } from "./env";

export const APIs = {
  aws: "https://kpnxz5rzo2.execute-api.us-east-1.amazonaws.com",
  apes: `https://fctqkloitc.execute-api.us-east-1.amazonaws.com/${ENVIRONMENT}`,
  wordpress: "https://angelgiving-dev.10web.site/wp-json/wp/v2",
};

export const LITEPAPER = `${BASE_URL}/docs/litepaper-introduction/`;
export const PRIVACY_POLICY = `/wp/privacy-policy/`;

export const TERMS_OF_USE_NPO = `/wp/terms-of-use-npo/`;
export const TERMS_OF_USE_DONOR = `/wp/terms-of-use/`;
