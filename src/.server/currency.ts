import { tables } from "@better-giving/types/list";
import type { DBCurrency, UserCurrencies } from "types/currency";
import { GetCommand, apes } from ".server/aws/db";
import { stripe } from ".server/sdks";

export const get_db_currencies = async (
  pref?: string
): Promise<UserCurrencies> => {
  const cmd = new GetCommand({
    TableName: tables.fiat_currency_data,
    Key: { currency_code: "_all" },
  });

  const res = await apes.send(cmd);
  const { supported_payment_currencies } =
    await stripe.countrySpecs.retrieve("US");

  const rates = res.Item?.rates || {};

  const items: DBCurrency[] = [];
  for (const c of supported_payment_currencies) {
    const rate = rates[c.toUpperCase()];
    if (!rate) continue;
    items.push({ code: c, rate, min: Math.round(rate) });
  }

  const pref_rate = pref && rates[pref.toUpperCase()];
  const pref_currency: DBCurrency | undefined = pref_rate
    ? { code: pref, rate: pref_rate, min: Math.round(pref_rate) }
    : undefined;

  return { pref: pref_currency, all: items };
};
