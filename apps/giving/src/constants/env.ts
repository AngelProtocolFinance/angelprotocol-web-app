import isMobile from "is-mobile";
import { NetworkType } from "types/lists";

export const IS_MOBILE = isMobile();
export const NETWORK:
  | "TESTNET"
  | "LOCAL"
  | undefined /** mainnet if not specified */ = process.env.NX_NETWORK as any;

export const IS_TEST = NETWORK === "TESTNET" || NETWORK === "LOCAL";

export const EXPECTED_NETWORK_TYPE: NetworkType = IS_TEST
  ? "testnet"
  : "mainnet";

export const INFURA_ID = process.env.NX_INFURA_ID;
export const KADO_API_KEY = process.env.NX_KADO_API_KEY;
export const APES_SECRECT = process.env.NX_APES_AUTH_SECRET_KEY;
export const ANGEL_SECRECT = process.env.NX_ANGEL_AUTH_SECRET_KEY;

export const JUNO_LCD_OVERRIDE = process.env.NX_JUNO_LCD_OVERRIDE;
export const JUNO_RPC_OVERRIDE = process.env.NX_JUNO_RPC_OVERRIDE;
export const JUNO_LCD = JUNO_LCD_OVERRIDE || process.env.NX_JUNO_LCD_NODE;
