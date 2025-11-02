import { round_number } from "./round-number";

/** @see {@link https://stripe.com/docs/currencies#zero-decimal}
 * @param amount
 * @param currency - uppercased by this function
 */
export const to_atomic = (amount: number, currency: string): number => {
  //biome-ignore format:
  const places: { [currency: string]: number } = {
    BIF: 0, CLP: 0, DJF: 0, GNF: 0, JPY: 0,  KMF: 0,  KRW: 0,  MGA: 0, PYG: 0, RWF: 0,UGX: 0,VND: 0, VUV: 0, XAF: 0,  XOF: 0,  XPF: 0, BHD: 3,
    JOD: 3,KWD: 3,OMR: 3, TND: 3,
  } as const;

  const p = places[currency.toUpperCase()] ?? 2;
  return Math.trunc(round_number(amount, p) * 10 ** p);
};

export const str_id = (raw: { id: string } | string | null) => {
  if (!raw) throw `invalid payment method ID: ${raw}`;
  if (typeof raw === "string") return raw;
  return raw.id;
};
