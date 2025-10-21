import type { IMetadataSubs } from "@better-giving/stripe";
import { send_email } from "lib/email";
import type Stripe from "stripe";

export async function handle_setup_intent_failed(
  data: Stripe.SetupIntentSetupFailedEvent.Data
) {
  const meta = data.object.metadata as IMetadataSubs | null;
  if (!meta) throw "missing setup intent metadata";

  const message = `Setup Intent ID ${data.object.id} failed due to: ${data.object.last_setup_error?.message ?? "Stripe error"}`;
  await send_email(
    {
      name: "donation-error",
      recipientName: meta.charityName,
      donorFirstName: meta.fullName.split(" ")[0],
      errorMessage: message,
    },
    [meta.email]
  );
}
