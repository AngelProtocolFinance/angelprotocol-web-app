import type { PaymentMethod } from "types/aws";

export const paymentMethod = (method: PaymentMethod | undefined) => {
  switch (method) {
    case "Bank":
      return "Bank Transfer";
    case "Card":
      return "Credit Card";
    case "Crypto":
      return "Crypto";
    default:
      return "--";
  }
};
