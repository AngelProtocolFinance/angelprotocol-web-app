import isMobile from "is-mobile";
import { NetworkType } from "types/lists";

export const IS_MOBILE = isMobile();

// THE CONSTANTS BELOW ARE ALL CONFIGURED BY ENVIRONMENT VARIABLES
// AND DISPLAY THE DESIRED TEXT/IMAGES/URLS/ETC THROUGHOUT THE APP
export const APP_TYPE = process.env.REACT_APP_APP_TYPE;
export const SEO_IMAGE = process.env.REACT_APP_SEO_IMAGE;
export const LOGO_IMG_LIGHT = process.env.REACT_APP_LOGO_IMG_LIGHT;
export const LOGO_IMG_DARK = process.env.REACT_APP_LOGO_IMG_DARK;
export const EMAIL_SUPPORT = process.env.REACT_APP_EMAIL_SUPPORT;
export const APP_NAME = process.env.REACT_APP_APP_NAME;
export const BASE_URL = `https://${process.env.REACT_APP_BASE_DOMAIN}`;
export const DAPP_URL = `https://${process.env.REACT_APP_DAPP_DOMAIN}`;
export const SUBDOMAIN_BUILDER = (subdomain: string) =>
  `https://${subdomain}.${process.env.REACT_APP_BASE_DOMAIN}`;

export const INFURA_ID = process.env.REACT_APP_INFURA_ID;

// NETWORK TYPE
export const NETWORK:
  | "TESTNET"
  | "LOCAL"
  | undefined /** mainnet if not specified */ = process.env
  .REACT_APP_NETWORK as any;
export const IS_TEST = NETWORK === "TESTNET" || NETWORK === "LOCAL";
export const EXPECTED_NETWORK_TYPE: NetworkType = IS_TEST
  ? "testnet"
  : "mainnet";

// SECRETS AND KEYS
export const KADO_API_KEY = process.env.REACT_APP_KADO_API_KEY;
export const APES_SECRECT = process.env.REACT_APP_APES_AUTH_SECRET_KEY;
export const ANGEL_SECRECT = process.env.REACT_APP_ANGEL_AUTH_SECRET_KEY;

// BLOCKCHAIN NODES
export const JUNO_LCD_OVERRIDE = process.env.REACT_APP_JUNO_LCD_OVERRIDE;
export const JUNO_RPC_OVERRIDE = process.env.REACT_APP_JUNO_RPC_OVERRIDE;
export const JUNO_LCD =
  JUNO_LCD_OVERRIDE || process.env.REACT_APP_JUNO_LCD_NODE;
