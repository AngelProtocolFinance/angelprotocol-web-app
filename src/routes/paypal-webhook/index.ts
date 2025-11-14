import { resp } from "helpers/https";
import type { ActionFunction } from "react-router";
import { handle_checkout_order_approved } from "./handle-order-approved";
import { verified_body } from "./helpers";
import type { TWebhookEvent } from "./types";
import { is_resp } from ".server/utils";

// async function handle_payment_capture_completed(
//   event: PaymentCaptureCompletedEvent
// ): Promise<void> {
//   const capture = event.resource;
//   const order_id = capture.supplementary_data.related_ids.order_id;

//   const breakdown = capture.seller_receivable_breakdown;

//   console.info("[paypal webhook] payment captured:", {
//     order_id,
//     capture_id: capture.id,
//     payee_email: capture.payee.email_address,
//     gross_amount: `${breakdown.gross_amount.value} ${breakdown.gross_amount.currency_code}`,
//     fee: `${breakdown.paypal_fee.value} ${breakdown.paypal_fee.currency_code}`,
//     net_amount: `${breakdown.net_amount.value} ${breakdown.net_amount.currency_code}`,
//   });
// }

// async function process_webhook_event(event: PayPalWebhookEvent): Promise<void> {
//   switch (event.event_type) {
//     case "CHECKOUT.ORDER.APPROVED":
//       await handle_checkout_order_approved(event as CheckoutOrderApprovedEvent);
//       break;

//     case "PAYMENT.CAPTURE.COMPLETED":
//       await handle_payment_capture_completed(
//         event as PaymentCaptureCompletedEvent
//       );
//       break;

//     case "PAYMENT.CAPTURE.DENIED":
//       console.info("[paypal webhook] payment capture denied:", event.id);
//       break;

//     case "PAYMENT.CAPTURE.REFUNDED":
//       console.info("[paypal webhook] payment capture refunded:", event.id);
//       break;

//     case "PAYMENT.CAPTURE.REVERSED":
//       console.info("[paypal webhook] payment capture reversed:", event.id);
//       break;

//     default:
//       console.info("[paypal webhook] unhandled event type:", event.event_type);
//   }
// }

export const action: ActionFunction = async ({ request }) => {
  try {
    const base_url = new URL(request.url).origin;
    const jsonstr = await verified_body(request);
    if (is_resp(jsonstr)) return jsonstr;

    const ev: TWebhookEvent = JSON.parse(jsonstr);

    console.info("[paypal webhook] received:", ev);

    switch (ev.event_type) {
      case "CHECKOUT.ORDER.APPROVED": {
        return await handle_checkout_order_approved(ev, base_url);
      }
      default: {
        console.info("[paypal webhook] unhandled event type:", ev.event_type);
      }
    }

    return resp.status(201, "event type not processed");
  } catch (error) {
    console.error("[paypal webhook] error processing webhook:", error);
    return resp.status(201, "error processing webhook");
  }
};
