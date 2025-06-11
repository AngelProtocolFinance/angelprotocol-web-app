import type { StripeDonation } from "@better-giving/donation";
import type Stripe from "stripe";
import { send_email } from "../helpers/send-email";

export async function handle_setup_intent_failed(
  data: Stripe.SetupIntentSetupFailedEvent.Data
) {
  const meta = data.object
    .metadata as StripeDonation.SetupIntentMetadata | null;
  if (!meta) throw `missing setup intent metadata`;

  const message = `Setup Intent ID ${data.object.id} failed due to: ${data.object.last_setup_error?.message ?? "Stripe error"}`;
  await send_email({
    recipients: [meta.email],
    template: "donation-error",
    data: {
      donorFirstName: meta.fullName.split(" ")[0],
      recipientName: meta.charityName,
      errorMessage: message,
    },
  });
}
