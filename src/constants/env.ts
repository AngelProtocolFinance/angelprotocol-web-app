import isMobile from "is-mobile";
import { NetworkType } from "types/lists";

export const IS_MOBILE = isMobile();
export const NETWORK:
  | "TESTNET"
  | "LOCAL"
  | undefined /** mainnet if not specified */ = process.env
  .REACT_APP_NETWORK as any;

const APP_TYPE = process.env.REACT_APP_APP_TYPE;

export const IS_AST = APP_TYPE === "AST";
export const IS_TEST = NETWORK === "TESTNET" || NETWORK === "LOCAL";

// NOUN AND ACTION WORDS RELATING TO PAYMENTS TO AP/AG ENDOWMENTS
// (AST == Contribution/Contribute & Charity == Donation/Donate)
export const PAYMENT_WORDS = {
  noun: {
    singular: IS_AST ? "contribution" : "donation",
    plural: IS_AST ? "contributions" : "donations",
  },
  verb: IS_AST ? "contribute" : "donate",
};
export const titleCase = (word: string) =>
  word.charAt(0).toUpperCase() + word.substr(1);

export const EXPECTED_NETWORK_TYPE: NetworkType = IS_TEST
  ? "testnet"
  : "mainnet";

export const INFURA_ID = process.env.REACT_APP_INFURA_ID;
export const KADO_API_KEY = process.env.REACT_APP_KADO_API_KEY;
export const APES_SECRECT = process.env.REACT_APP_APES_AUTH_SECRET_KEY;
export const ANGEL_SECRECT = process.env.REACT_APP_ANGEL_AUTH_SECRET_KEY;

export const JUNO_LCD_OVERRIDE = process.env.REACT_APP_JUNO_LCD_OVERRIDE;
export const JUNO_RPC_OVERRIDE = process.env.REACT_APP_JUNO_RPC_OVERRIDE;
export const JUNO_LCD =
  JUNO_LCD_OVERRIDE || process.env.REACT_APP_JUNO_LCD_NODE;
