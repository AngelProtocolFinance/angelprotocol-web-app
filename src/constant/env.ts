import isMobile from "is-mobile";
import { NetworkType } from "types/lists";

export const IS_MOBILE = isMobile();

// THE CONSTANTS BELOW ARE ALL CONFIGURED BY ENVIRONMENT VARIABLES
// AND DISPLAY THE DESIRED TEXT/IMAGES/URLS/ETC THROUGHOUT THE APP
export const APP_TYPE = process.env.VITE_APP_TYPE;
export const IS_AST = APP_TYPE === "AST";
export const SEO_IMAGE = process.env.VITE_SEO_IMAGE;
export const LOGO_IMG_LIGHT = process.env.VITE_LOGO_IMG_LIGHT;
export const LOGO_IMG_DARK = process.env.VITE_LOGO_IMG_DARK;
export const EMAIL_SUPPORT = process.env.VITE_EMAIL_SUPPORT;
export const APP_NAME = process.env.VITE_APP_NAME;
export const BASE_URL = `https://${process.env.VITE_BASE_DOMAIN}`;
export const DAPP_URL = `https://${process.env.VITE_DAPP_DOMAIN}`;
export const SUBDOMAIN_BUILDER = (subdomain: string) =>
  `https://${subdomain}.${process.env.VITE_BASE_DOMAIN}`;

export const INFURA_ID = process.env.VITE_INFURA_ID;

// NETWORK TYPE
export const NETWORK:
  | "TESTNET"
  | "LOCAL"
  | undefined /** mainnet if not specified */ = process.env.VITE_NETWORK as any;
export const IS_TEST = NETWORK === "TESTNET" || NETWORK === "LOCAL";
export const EXPECTED_NETWORK_TYPE: NetworkType = IS_TEST
  ? "testnet"
  : "mainnet";

// SECRETS AND KEYS
export const KADO_API_KEY = process.env.VITE_KADO_API_KEY;
export const APES_SECRECT = process.env.VITE_APES_AUTH_SECRET_KEY;
export const ANGEL_SECRECT = process.env.VITE_ANGEL_AUTH_SECRET_KEY;
export const WEB3AUTH_CLIENT_ID =
  process.env.VITE_WEB3AUTH_CLIENT_ID ||
  "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk";

// BLOCKCHAIN NODES
export const JUNO_LCD_OVERRIDE = process.env.VITE_JUNO_LCD_OVERRIDE;
export const JUNO_RPC_OVERRIDE = process.env.VITE_JUNO_RPC_OVERRIDE;
export const JUNO_LCD = JUNO_LCD_OVERRIDE || process.env.VITE_JUNO_LCD_NODE;
