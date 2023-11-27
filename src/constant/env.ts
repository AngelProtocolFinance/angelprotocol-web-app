import isMobile from "is-mobile";
import { NetworkType } from "types/lists";

export const IS_MOBILE = isMobile();

// THE CONSTANTS BELOW ARE ALL CONFIGURED BY ENVIRONMENT VARIABLES
// AND DISPLAY THE DESIRED TEXT/IMAGES/URLS/ETC THROUGHOUT THE APP
export const SEO_IMAGE =
  "https://charity-profile-images.s3.amazonaws.com/logo/angelprotocol-wings-bl.png";
export const EMAIL_SUPPORT = "support@better.giving";
export const APP_NAME = "Better Giving";
export const BASE_URL = "https://better.giving";
export const DAPP_URL = "https://app.better.giving";

const ENV = import.meta.env.VITE_ENVIRONMENT;

export const IS_TEST = ENV === "STAGING";
export const EXPECTED_NETWORK_TYPE: NetworkType = IS_TEST
  ? "testnet"
  : "mainnet";
