import type { Donation } from "types/aws";

export const lastHeaderName: { [K in Donation.Status]: string } = {
  final: "Receipt",
  intent: "Action",
  pending: "Tx hash",
};

const commonNames: { [index: string]: string | undefined } = {
  CHARIOT: "Daf",
  STRIPE: "Card",
};

export function donationMethod(
  method: Donation.Method | { id: Donation.Record["viaId"]; name: string }
) {
  if (typeof method === "string") return method;
  if (method.id === "fiat") return commonNames[method.name] ?? method.name;

  return "Crypto" satisfies Donation.Method;
}
