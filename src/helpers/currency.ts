import type { ICurrencyFv } from "types/currency";
import type { ICurrenciesFv } from "types/currency";

export const to_currencies_fv = (
  pref: string | undefined,
  stripe_currs: string[],
  rate_map: Record<string, number>
): ICurrenciesFv => {
  const items: ICurrencyFv[] = [];
  for (const c of stripe_currs) {
    const uppc = c.toUpperCase();
    const rate = rate_map[uppc];
    if (!rate) continue;
    items.push({
      code: uppc,
      rate,
      min: Math.round(rate * 2 /** 2 usd equivalent */),
    });
  }

  if (!pref) return { pref: undefined, all: items };

  const upppref = pref.toUpperCase();

  const pref_rate = rate_map[upppref];
  const pref_currency: ICurrencyFv = {
    code: upppref,
    rate: pref_rate,
    min: Math.round(pref_rate),
  };

  return { pref: pref_currency, all: items };
};
