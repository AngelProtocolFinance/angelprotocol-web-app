import type { Donation } from "types/aws";

export const lastHeaderName: { [K in Donation.Status]: string } = {
  final: "Receipt",
  intent: "Action",
  pending: "Tx hash",
};
