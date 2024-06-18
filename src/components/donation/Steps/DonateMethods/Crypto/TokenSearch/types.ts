export type CoinGeckoToken = {
  /** e.g. `0chain` */
  id: string;
  /** e.g. `zcn` */
  symbol: string;
  /** e.g. `Zus` */
  name: string;
  /** e.g. `{ "ethereum": "0x123..."}` */
  platforms: { [platformId: string]: string };
};
