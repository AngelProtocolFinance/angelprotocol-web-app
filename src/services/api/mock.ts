import { http, HttpResponse } from "msw";

export const fiatDonationIntentCreationErrorHandler = http.post(
  "/api/stripe-intents",
  () => HttpResponse.error()
);

export const handlers = [
  // Mock Stripe intent creation
  http.post("/api/stripe-intents", () => {
    return HttpResponse.json({
      //stripe.Element is mocked and doesn't need real intent id
      clientSecret: "fake_intent_id",
    });
  }),
];
