const usd = (decimals = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export function toUsd(num: number): string {
  const n = Math.abs(num);
  if (n < 1_000_000) {
    return usd().format(num); // Exact whole-dollar amounts
  }

  if (n < 1_000_000_000) {
    const millions = num / 1_000_000;
    //millions with two decimal points
    return `${usd(2).format(millions)}M`;
  }
  const billions = num / 1_000_000_000;
  return `${usd(2).format(billions)}B`;
}
