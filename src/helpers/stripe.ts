import { rd2num } from "./decimal";

/** [atomic units, multiple] */
const spec: Record<string, [number, number]> = {
  BIF: [0, 0],
  CLP: [0, 0],
  DJF: [0, 0],
  GNF: [0, 0],
  JPY: [0, 0],
  KMF: [0, 0],
  KRW: [0, 0],
  MGA: [0, 0],
  PYG: [0, 0],
  RWF: [0, 0],
  VND: [0, 0],
  VUV: [0, 0],
  XAF: [0, 0],
  XOF: [0, 0],
  XPF: [0, 0],
  // https://docs.stripe.com/currencies#special-cases
  ISK: [0, 2],
  HUF: [0, 2],
  TWD: [0, 2],
  UGX: [0, 2],
};

/** @see {@link https://stripe.com/docs/currencies#zero-decimal}
 * @param amount
 * @param currency - uppercased by this function
 */

export const to_atomic = (amount: number, currency: string): number => {
  const c = currency.toUpperCase();
  const [p, m] = spec[c] ?? [2, 2];
  const rounded = rd2num(amount, p);

  return Math.trunc(rounded * 10 ** m);
};

export const str_id = (raw: { id: string } | string | null) => {
  if (!raw) throw `invalid payment method ID: ${raw}`;
  if (typeof raw === "string") return raw;
  return raw.id;
};
