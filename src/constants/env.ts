import isMobile from "is-mobile";

export const IS_MOBILE = isMobile();

// THE CONSTANTS BELOW ARE ALL CONFIGURED BY ENVIRONMENT VARIABLES
// AND DISPLAY THE DESIRED TEXT/IMAGES/URLS/ETC THROUGHOUT THE APP
export const SEO_IMAGE =
  "https://charity-profile-images.s3.amazonaws.com/bettergiving-favicon-min.png";
export const EMAIL_SUPPORT = "support@better.giving";
export const APP_NAME = "Better Giving";
export const BASE_URL = "https://better.giving";
export const DAPP_URL = "https://app.better.giving";
export const AWS_S3_PUBLIC_BUCKET = "https://endow-profiles.s3.amazonaws.com";

const ENV = process.env.PUBLIC_ENVIRONMENT;

export const IS_TEST = ENV === "STAGING";

export const PUBLIC_STRIPE_KEY = IS_TEST
  ? "pk_test_51MGl2PJBsJzBirEIi04vNpC8N1pvsmDb8zUHwBV0O47wLoi3atillyJSEz0Syb7dGSOoNEZmFEjZzkKVsWEOI5AP00MP1H0S2R"
  : process.env.REACT_APP_PUBLIC_STRIPE_KEY;
