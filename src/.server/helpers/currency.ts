import type { ICurrencyFv } from "types/currency";
import type { ICurrenciesFv } from "types/currency";

export const to_currencies_fv = (
  pref: string | undefined,
  stripe_currs: string[],
  rate_map: Record<string, number>
): ICurrenciesFv => {
  const items: ICurrencyFv[] = [];
  for (const c of stripe_currs) {
    const rate = rate_map[c.toUpperCase()];
    if (!rate) continue;
    items.push({ code: c, rate, min: Math.round(rate) });
  }
  const pref_rate = pref && rate_map[pref.toUpperCase()];
  const pref_currency: ICurrencyFv | undefined = pref_rate
    ? { code: pref, rate: pref_rate, min: Math.round(pref_rate) }
    : undefined;

  return { pref: pref_currency, all: items };
};
