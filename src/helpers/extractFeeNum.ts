import Dec from "decimal.js";

export default function convertFromMicro(fee: number): number {
  return new Dec(fee).div(1e6).toNumber();
}
