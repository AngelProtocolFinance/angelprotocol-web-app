import { IS_TEST } from "./env";

export const MELD_ACCESS_TOKEN = process.env.REACT_APP_MELD_ACCESS_TOKEN;

export const SERVICE_PROVIDER = "TRANSAK";

export const DESTINATION_CURRENCY_CODE = "USDC_POLYGON";

export const MELD_API = IS_TEST
  ? "https://api-sb.meld.io"
  : "https://api.meld.io";
