import { denoms } from "./currency";

type Wallets = {
  [index: string]: string;
};

export const ap_wallets: Wallets = {
  [denoms.ether]: "0x5a882Eb704EA153B117Ab2b1797bA46a1B09Da2c",
  [denoms.btc]: "bc1qezneaj4976ev4kkqws40dk2dxgxwcjynggd8fq",
  [denoms.uusd]: "terra1gmxefcqt8sfckw0w44tpkuaz0p27eddq76elzx",
  [denoms.uluna]: "terra1gmxefcqt8sfckw0w44tpkuaz0p27eddq76elzx",
  [denoms.sol]: "CkiKLEa9eSEoG6CoTSuaahsF2WqNgArnvoCSbNZjJ7BQ",
  [denoms.uatom]: "cosmos17wp2dr7zrsrrtlz9cn4sxtpsha37dwmwa5n6dr",
  [denoms.ANC]: "terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76",
  [denoms.ASTRO]: "terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3",
  [denoms.MIR]: "terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6",
  [denoms.MARS]: "terra12hgwnpupflfpuual532wgrxu2gjp0tcagzgx4n",
  [denoms.MINE]: "terra1kcthelkax4j9x8d3ny6sdag0qmxxynl3qtcrpy",
  [denoms.PRISM]: "terra1dh9478k2qvqhqeajhn75a2a7dsnf74y5ukregw",
  [denoms.xPRISM]: "terra1042wzrwg2uk6jqxjm34ysqquyr9esdgm5qyswz",
  [denoms.bETH]: "terra1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun",
  [denoms.bLUNA]: "terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp",
  [denoms.LunaX]: "terra17y9qkl8dfkeg4py7n0g5407emqnemc3yqk5rup",
};
