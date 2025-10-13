import * as v from "valibot";

export const currency_fv = v.object({
  /** lowercase */
  code: v.string(),
  /** unit per usd, wise currency doesn't have rate */
  rate: v.number(),
  min: v.number(),
});

export interface ICurrencyFv extends v.InferOutput<typeof currency_fv> {}

export interface ICurrenciesFv {
  pref?: ICurrencyFv;
  all: ICurrencyFv[];
}
