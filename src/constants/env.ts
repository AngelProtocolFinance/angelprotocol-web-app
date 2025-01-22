import { fallback, literal, parse, union } from "valibot";

export const envSchema = fallback(
  union([literal("dev"), literal("production")]),
  "dev"
);
export const env = parse(envSchema, import.meta.env.VITE_ENVIRONMENT);
export const IS_TEST = env === "dev";

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

export const PUBLIC_STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY || "";
export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || "";
export const CHARIOT_CONNECT_ID = import.meta.env.VITE_CHARIOT_CONNECT_ID || "";
