import type { DonationIntent } from "@better-giving/donation/intent";
import { apes } from "api/api";
import type { PayPalOrder } from "types/aws";

export const captureOrder = async (orderId: string): Promise<PayPalOrder> => {
  return apes.post(`fiat-donation/paypal/orders/${orderId}/capture`).json();
};

export const createOrder = async (intent: DonationIntent) => {
  return apes
    .post("fiat-donation/paypal/orders/v2", {
      json: intent,
    })
    .json<{ orderId: string }>()
    .then((res) => res.orderId);
};
