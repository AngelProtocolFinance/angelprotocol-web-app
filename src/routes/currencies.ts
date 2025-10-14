import { resp } from "helpers/https";
import type { LoaderFunction } from "react-router";
import { cognito } from ".server/auth";
import { table } from ".server/aws/db";
import { to_currencies_fv } from ".server/helpers/currency";
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

  const r = to_currencies_fv(pref, supported_payment_currencies, all);
  return resp.json(r);
};

async function currency_from_ip(user_ip: string): Promise<string | undefined> {
  // https://ipapi.co/api/#specific-location-field
  const res = await fetch(`https://ipapi.co/${user_ip}/currency/`);
  if (!res.ok) return;
  return res.text();
}
