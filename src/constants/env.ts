import { fallback, literal, parse, union } from "valibot";

const nv = (name: string): string => {
  const v = import.meta.env[`VITE_${name}`];
  if (!v) {
    console.error(`Missing env var: VITE_${name}`);
  }
  return v || "";
};

export const env_schema = fallback(
  union([literal("dev"), literal("production")]),
  "dev"
);
export const env = parse(env_schema, import.meta.env.VITE_ENVIRONMENT);
export const IS_TEST = env === "dev";

// THE CONSTANTS BELOW ARE ALL CONFIGURED BY ENVIRONMENT VARIABLES
// AND DISPLAY THE DESIRED TEXT/IMAGES/URLS/ETC THROUGHOUT THE APP
export const APP_NAME = "Better Giving";
export const BASE_URL = `https://${IS_TEST ? "staging." : ""}better.giving`;
export const BOOK_A_DEMO =
  "https://meetings-eu1.hubspot.com/chauncey-st-john/better-giving-nonprofit-demo";
export const INTERCOM_HELP = "https://intercom.help/better-giving/en";
export const AWS_S3_PUBLIC_BUCKET = "https://endow-profiles.s3.amazonaws.com";

export const stripe_public_key = nv("STRIPE_PK");
export const paypal_client_id = nv("PAYPAL_CLIENT_ID");
export const CHARIOT_CONNECT_ID = import.meta.env.VITE_CHARIOT_CONNECT_ID || "";
