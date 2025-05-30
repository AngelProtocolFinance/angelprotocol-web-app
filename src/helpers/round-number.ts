export const round_number = (num: number, decimals: number): number => {
  const parsedNum = Number(num);
  const parsedDecimals = Number(decimals);

  const placeValue = +String(1).padEnd(parsedDecimals + 1, "0");
  return Math.trunc(parsedNum * placeValue) / placeValue;
};
