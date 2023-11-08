import isMobile from "is-mobile";
import { NetworkType } from "types/lists";

export const IS_MOBILE = isMobile();

// THE CONSTANTS BELOW ARE ALL CONFIGURED BY ENVIRONMENT VARIABLES
// AND DISPLAY THE DESIRED TEXT/IMAGES/URLS/ETC THROUGHOUT THE APP
export const SEO_IMAGE =
  "https://charity-profile-images.s3.amazonaws.com/logo/angelprotocol-wings-bl.png";
export const EMAIL_SUPPORT = "support@angelgiving.io";
export const APP_NAME = "Angel Giving";
export const BASE_URL = "https://angelgiving.io";
export const DAPP_URL = "https://app.angelgiving.io";

// NETWORK TYPE
const NETWORK: "TESTNET" | "LOCAL" | undefined /** mainnet if not specified */ =
  import.meta.env.VITE_NETWORK as any;
export const IS_TEST = NETWORK === "TESTNET" || NETWORK === "LOCAL";
export const EXPECTED_NETWORK_TYPE: NetworkType = IS_TEST
  ? "testnet"
  : "mainnet";

// SECRETS AND KEYS
export const KADO_API_KEY = import.meta.env.VITE_KADO_API_KEY;
export const APES_SECRECT = import.meta.env.VITE_APES_AUTH_SECRET_KEY;
export const ANGEL_SECRECT = import.meta.env.VITE_ANGEL_AUTH_SECRET_KEY;

// BLOCKCHAIN NODES
export const JUNO_LCD_OVERRIDE = import.meta.env.VITE_JUNO_LCD_OVERRIDE;
export const JUNO_RPC_OVERRIDE = import.meta.env.VITE_JUNO_RPC_OVERRIDE;
