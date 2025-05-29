import { GetCommand, apes } from "./aws/db";

/**
 * @param currency - lowercase iso4217 code
 */
export const get_usd_rate = async (currency: string): Promise<number> => {
  const cmd = new GetCommand({
    TableName: "fiat_currency_data",
    Key: { currency_code: "_all" },
  });
  const result = await apes.send(cmd);
  const { rates } = result.Item!;
  const rate = rates[currency.toUpperCase()];

  if (!rate) throw { message: `Currency ${currency} not found.` };
  return rate;
};
