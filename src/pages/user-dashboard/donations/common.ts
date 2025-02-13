import type { Donation } from "types/aws/ap/donations";

export const lastHeaderName: { [K in Donation.Status]: string } = {
  final: "Receipt",
  intent: "Action",
  pending: "Tx hash",
};

const commonNames: {
  [K in Donation.FiatRamp | (string & {})]: string | undefined;
} = {
  CHARIOT: "Daf",
  STRIPE: "Card",
  PAYPAL: "PayPal",
};

export function donationMethod(method: string | { id: string; name: string }) {
  if (typeof method === "string") return method;
  if (method.id === "fiat") return commonNames[method.name] ?? method.name;

  return "Crypto" satisfies Donation.Method;
}
