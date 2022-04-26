import { Denoms } from "@types-lists";

type Wallets = {
  [key in Extract<
    Denoms,
    "ether" | "btc" | "uusd" | "uluna" | "sol" | "uatom"
  >]: string;
};

export const ap_wallets: Wallets = {
  ether: "0x5a882Eb704EA153B117Ab2b1797bA46a1B09Da2c",
  btc: "bc1qezneaj4976ev4kkqws40dk2dxgxwcjynggd8fq",
  uusd: "terra1gmxefcqt8sfckw0w44tpkuaz0p27eddq76elzx",
  uluna: "terra1gmxefcqt8sfckw0w44tpkuaz0p27eddq76elzx",
  sol: "CkiKLEa9eSEoG6CoTSuaahsF2WqNgArnvoCSbNZjJ7BQ",
  uatom: "cosmos17wp2dr7zrsrrtlz9cn4sxtpsha37dwmwa5n6dr",
};
