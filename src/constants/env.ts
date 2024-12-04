export const ENVIRONMENT = process.env.PUBLIC_ENVIRONMENT;
export const IS_TEST = ENVIRONMENT === "dev";

// THE CONSTANTS BELOW ARE ALL CONFIGURED BY ENVIRONMENT VARIABLES
// AND DISPLAY THE DESIRED TEXT/IMAGES/URLS/ETC THROUGHOUT THE APP
export const SEO_IMAGE =
  "https://charity-profile-images.s3.amazonaws.com/bettergiving-favicon-min.png";
export const EMAIL_SUPPORT = "support@better.giving";
export const APP_NAME = "Better Giving";
export const BASE_URL = `https://${IS_TEST ? "staging." : ""}better.giving`;
export const BOOK_A_DEMO =
  "https://meetings-eu1.hubspot.com/tim-stirrup/better-giving-online-demonstration";
export const INTERCOM_HELP = "https://intercom.help/better-giving/en";
export const AWS_S3_PUBLIC_BUCKET = "https://endow-profiles.s3.amazonaws.com";

export const PUBLIC_STRIPE_KEY = process.env.PUBLIC_STRIPE_KEY || "";
export const PAYPAL_CLIENT_ID = process.env.PUBLIC_PAYPAL_CLIENT_ID || "";
export const CHARIOT_CONNECT_ID = process.env.PUBLIC_CHARIOT_CONNECT_ID || "";
