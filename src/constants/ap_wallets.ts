import { denoms } from "./currency";

type Wallets = Partial<{
  [index in denoms]: string;
}>;

export const ap_wallets: Wallets = {
  [denoms.ether]: "0x5a882Eb704EA153B117Ab2b1797bA46a1B09Da2c",
  [denoms.btc]: "bc1qezneaj4976ev4kkqws40dk2dxgxwcjynggd8fq",
  [denoms.uluna]: "terra1gmxefcqt8sfckw0w44tpkuaz0p27eddq76elzx",
  [denoms.sol]: "CkiKLEa9eSEoG6CoTSuaahsF2WqNgArnvoCSbNZjJ7BQ",
  [denoms.uatom]: "cosmos17wp2dr7zrsrrtlz9cn4sxtpsha37dwmwa5n6dr",
};
