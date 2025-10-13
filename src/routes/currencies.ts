import { resp } from "helpers/https";
import type { LoaderFunction } from "react-router";
import type { ICurrenciesFv, ICurrencyFv } from "types/currency";
import { cognito } from ".server/auth";
import { table } from ".server/aws/db";
import { stripe } from ".server/sdks";

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await cognito.retrieve(request);
  const user_ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip");

  const pref =
    user?.currency || (user_ip ? await currency_from_ip(user_ip) : undefined);

  const { all } = await table.currency_map("Usd");

  const { supported_payment_currencies } =
    await stripe.countrySpecs.retrieve("US");

  const items: ICurrencyFv[] = [];
  for (const c of supported_payment_currencies) {
    const rate = all[c.toUpperCase()];
    if (!rate) continue;
    items.push({ code: c, rate, min: Math.round(rate) });
  }
  const pref_rate = pref && all[pref.toUpperCase()];
  const pref_currency: ICurrencyFv | undefined = pref_rate
    ? { code: pref, rate: pref_rate, min: Math.round(pref_rate) }
    : undefined;

  return resp.json({
    pref: pref_currency,
    all: items,
  } satisfies ICurrenciesFv);
};

async function currency_from_ip(user_ip: string): Promise<string | undefined> {
  // https://ipapi.co/api/#specific-location-field
  const res = await fetch(`https://ipapi.co/${user_ip}/currency/`);
  if (!res.ok) return;
  return res.text();
}
