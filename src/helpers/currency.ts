import { MIN_DONATION_USD } from "constants/common";
import type { ICurrencyFv } from "types/currency";
import type { ICurrenciesFv } from "types/currency";

export const to_currencies_fv = (
  pref: string | undefined,
  stripe_currs: string[],
  units_per_usd: Record<string, number>
): ICurrenciesFv => {
  const items: ICurrencyFv[] = [];
  for (const c of stripe_currs) {
    const uppc = c.toUpperCase();
    /** unit per usd */
    const uusd = units_per_usd[uppc];
    if (!uusd) continue;
    items.push({
      code: uppc,
      rate: uusd,
      min: Math.round(uusd * MIN_DONATION_USD),
    });
  }

  if (!pref) return { pref: undefined, all: items };

  const upppref = pref.toUpperCase();

  const pref_rate = units_per_usd[upppref];
  const pref_currency: ICurrencyFv = {
    code: upppref,
    rate: pref_rate,
    min: Math.round(pref_rate * MIN_DONATION_USD),
  };

  return { pref: pref_currency, all: items };
};
