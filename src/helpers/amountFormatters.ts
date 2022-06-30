import Decimal from "decimal.js";

const DEFAULT_NUM_DECIMAL = 6;

function condenseAmount(
  rawBalance: string | number,
  decimals: number = DEFAULT_NUM_DECIMAL
) {
  return new Decimal(rawBalance).div(new Decimal(10).pow(decimals)).toNumber();
}

function scaleAmount(
  amount: number | string,
  decimals: number = DEFAULT_NUM_DECIMAL
) {
  return new Decimal(amount)
    .mul(new Decimal(10).pow(decimals))
    .divToInt(1)
    .toString();
}

export { condenseAmount, scaleAmount };
