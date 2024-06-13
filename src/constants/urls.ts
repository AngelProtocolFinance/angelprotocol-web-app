import { BASE_URL, ENVIRONMENT } from "./env";

export const APIs = {
  aws: "https://ap-api.better.giving",
  apes: `https://apes-api.better.giving/${ENVIRONMENT}`,
  wordpress: "https://wp-api.better.giving",
};

export const LITEPAPER = `${BASE_URL}/docs/litepaper-introduction/`;
export const PRIVACY_POLICY = `${BASE_URL}/privacy-policy/`;
export const TERMS_OF_USE_NPO = `${BASE_URL}/terms-of-use-npo/`;
export const TERMS_OF_USE_DONOR = `${BASE_URL}/terms-of-use/`;
