export type CoinGeckoToken = {
  /** e.g. `0chain` */
  id: string;
  /** e.g. `zcn` */
  symbol: "zcn";
  /** e.g. `Zus` */
  name: "Zus";
  /** e.g. `{ "ethereum": "0x123..."}` */
  platforms: { [platformId: string]: string };
};
