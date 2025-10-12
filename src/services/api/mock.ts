import { http, HttpResponse } from "msw";
import { href } from "react-router";
import type { ITokenMin } from "types/api";

export const fiatDonationIntentCreationErrorHandler = http.post(
  "/api/donation-intents/stripe",
  () => HttpResponse.error()
);

export const handlers = [
  // Mock Stripe intent creation
  http.post("/api/donation-intents/stripe", () => {
    return HttpResponse.json({
      //stripe.Element is mocked and doesn't need real intent id
      clientSecret: "fake_intent_id",
    });
  }),
  http.get(href("/api/tokens/:code/min_usd", { code: ":code" }), () => {
    return HttpResponse.json({ min: 1, rate: 1 } satisfies ITokenMin);
  }),
];
