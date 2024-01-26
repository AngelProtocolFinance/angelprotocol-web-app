export default function projectFunds(
  years: number,
  locked: number,
  liquid: number,
  apy: number,
  harvest_rate: number,
): { locked: number; liquid: number } {
  //base case
  if (years <= 0) {
    return { locked, liquid };
  }
  const new_locked = getNextYearVal(apy - harvest_rate, 365, locked);
  const new_liq = liquid + new_locked * (harvest_rate / 100);
  return projectFunds(years - 1, new_locked, new_liq, apy, harvest_rate);
}

function getNextYearVal(
  apy: number, //annual rate
  mode: number, //num times compounded on course of period
  pv: number, // current value
) {
  return pv * Math.pow(1 + apy / 100 / mode, mode);
}
