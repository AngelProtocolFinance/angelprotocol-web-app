import { table } from "./aws/db";

/**
 * @param currency - lowercase iso4217 code
 * @returns number - amount/usd
 */
export const get_usd_rate = async (currency: string): Promise<number> => {
  const { all: rates } = await table.currency_map("Usd");
  const rate = rates[currency.toUpperCase()];

  if (!rate) throw { message: `Currency ${currency} not found.` };
  return rate;
};
