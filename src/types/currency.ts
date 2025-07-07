import * as v from "valibot";

export const db_currency = v.object({
  /** lowercase */
  code: v.string(),
  /** unit per usd, wise currency doesn't have rate */
  rate: v.number(),
  min: v.number(),
});

export interface DBCurrency extends v.InferOutput<typeof db_currency> {}

export interface UserCurrencies {
  pref?: DBCurrency;
  all: DBCurrency[];
}
