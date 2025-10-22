import { http, HttpResponse } from "msw";
import { href } from "react-router";
import type { ITokenEstimate } from "types/api";
import type { IStripeIntentReturn } from "types/donation-intent";

export const fiatDonationIntentCreationErrorHandler = http.post(
  "/api/donation-intents/stripe",
  () => HttpResponse.error()
);

export const handlers = [
  // Mock Stripe intent creation
  http.post("/api/donation-intents/stripe", () => {
    return HttpResponse.json({
      //stripe.Element is mocked and doesn't need real intent id
      client_secret: "fake_intent_id",
      order_id: "fake_order_id",
    } satisfies IStripeIntentReturn);
  }),
  http.get(href("/api/tokens/:code/min-usd", { code: ":code" }), () => {
    return HttpResponse.json({ min: 1, rate: 1 } satisfies ITokenEstimate);
  }),
];
