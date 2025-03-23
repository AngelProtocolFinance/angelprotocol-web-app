const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function toUsd(num: number): string {
  if (num < 1_000_000) {
    return usd.format(num); // Exact whole-dollar amounts
  }

  if (num < 1_000_000_000) {
    const millions = num / 1_000_000;
    //millions with two decimal points
    return `${usd.format(+millions.toFixed(2))}M`;
  }
  const billions = num / 1_000_000_000;
  return `${usd.format(+billions.toFixed(2))}B`;
}
