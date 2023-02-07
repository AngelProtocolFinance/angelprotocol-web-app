import isMobile from "is-mobile";
import { NetworkType } from "types/lists";

export const IS_MOBILE = isMobile();
export const NETWORK:
  | "TESTNET"
  | "LOCAL"
  | undefined /** mainnet if not specified */ = process.env
  .REACT_APP_NETWORK as any;

export const IS_TEST = NETWORK === "TESTNET" || NETWORK === "LOCAL";

export const EXPECTED_NETWORK_TYPE: NetworkType = IS_TEST
  ? "testnet"
  : "mainnet";

export const INFURA_ID = process.env.REACT_APP_INFURA_ID;
export const KADO_API_KEY = process.env.REACT_APP_KADO_API_KEY;
export const APES_SECRECT = process.env.REACT_APP_APES_AUTH_SECRET_KEY;
export const ANGEL_SECRECT = process.env.REACT_APP_ANGEL_AUTH_SECRET_KEY;

export const JUNO_LCD_OVERRIDE = process.env.REACT_APP_JUNO_LCD_OVERRIDE;
export const JUNO_RPC_OVERRIDE = process.env.REACT_APP_JUNO_RPC_OVERRIDE;
