import { IS_TEST } from "constant/env";

export const axelarAPIurl = IS_TEST
  ? "https://testnet.api.gmp.axelarscan.io"
  : "https://api.gmp.axelarscan.io";
