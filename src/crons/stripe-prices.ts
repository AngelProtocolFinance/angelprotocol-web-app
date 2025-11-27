import { format } from "date-fns";
import { resp } from "helpers/https";
import { to_atomic } from "helpers/stripe";
import type { ActionFunction } from "react-router";
import type Stripe from "stripe";
import { table } from ".server/aws/db";
import { stripe_envs } from ".server/env";
import { stripe } from ".server/sdks";
import { is_resp, qstash_body } from ".server/utils";

const currency_opts = (
  rate: (code: string) => number, //lowercase
  currencies: string[]
) => {
  const obj: Record<string, Stripe.PriceCreateParams.CurrencyOptions> = {};
  for (const code of currencies) {
    const amnt = rate(code);
    if (!amnt) continue;
    obj[code] = { unit_amount: to_atomic(amnt, code) };
  }
  return obj;
};
// daily trigger
export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  try {
    const b = await qstash_body(request);
    if (is_resp(b)) return b;
    const lookup_key = "standard_monthly";

    const { all: rates } = await table.currency_map("Usd");

    const countrySpec = await stripe.countrySpecs.retrieve("US");
    const currencies = countrySpec.supported_payment_currencies.filter(
      //exclude as "usd" is base in prices.create
      (code) => code !== "usd"
    );

    const res = await stripe.prices.create(
      {
        active: true,
        billing_scheme: "per_unit",
        currency: "usd",
        currency_options: currency_opts((x) => rates[x], currencies),
        lookup_key: lookup_key,
        product: stripe_envs.subs_product_id,
        recurring: { interval: "month", interval_count: 1 },
        transfer_lookup_key: true,
        unit_amount: 100, // 1 USD in cents
      },
      //ensure only one per day
      { idempotencyKey: `${lookup_key}-${format(new Date(), "yyyy-MM-dd")}` }
    );
    return resp.txt(`created price ${res.id}`);
  } catch (err) {
    console.error(err);
    return resp.txt("price creation failed", 500);
  }
};
