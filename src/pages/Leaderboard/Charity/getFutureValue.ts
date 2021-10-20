export default function getFutureValue(
  period: number, //number of years
  apy: number, //annual rate
  mode: number, //num times compounded on course of period
  pv: number // current value
) {
  return pv * Math.pow(1 + apy / 100 / mode, period * mode);
}
