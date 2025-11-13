import crypto from "node:crypto";
import { crc32 } from "node:zlib";
import type { ActionFunction } from "react-router";
import { paypal_envs } from ".server/env";

interface PayPalMoney {
  value: string;
  currency_code: string;
}

interface PayPalPayee {
  email_address: string;
  merchant_id?: string;
}

interface PayPalAmountBreakdown {
  gross_amount: PayPalMoney;
  paypal_fee: PayPalMoney;
  net_amount: PayPalMoney;
}

interface PayPalCaptureResource {
  id: string;
  payee: PayPalPayee;
  seller_receivable_breakdown: PayPalAmountBreakdown;
  supplementary_data: {
    related_ids: {
      order_id: string;
    };
  };
}

interface PayPalName {
  given_name: string;
  surname: string;
}

/**
 * Payer information from PayPal webhook events.
 * Note: Additional fields like phone, birth_date, tax_info are not included.
 */
interface PayPalPayer {
  name: PayPalName;
  email_address: string;
  payer_id: string;
}

/**
 * Shipping address information.
 * Note: Additional fields like name, phone may exist but are not included.
 */
interface PayPalAddress {
  address_line_1: string;
  address_line_2?: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}

interface PayPalShipping {
  address: PayPalAddress;
}

/**
 * Purchase unit in an order.
 * Note: Fields like reference_id, payee, payments, description are not included.
 */
interface PayPalPurchaseUnit {
  amount: PayPalMoney;
  shipping?: PayPalShipping;
}

/**
 * Order resource from CHECKOUT.ORDER.APPROVED event.
 * Note: Fields like status, intent, create_time, update_time, links are not included.
 */
interface PayPalOrderResource {
  id: string;
  payer: PayPalPayer;
  purchase_units: PayPalPurchaseUnit[];
}

interface PayPalWebhookEvent<T = unknown> {
  id: string;
  event_type: string;
  resource: T;
}

type PaymentCaptureCompletedEvent = PayPalWebhookEvent<PayPalCaptureResource>;
type CheckoutOrderApprovedEvent = PayPalWebhookEvent<PayPalOrderResource>;

interface PayPalWebhookHeaders {
  "paypal-transmission-id": string;
  "paypal-transmission-time": string;
  "paypal-transmission-sig": string;
  "paypal-cert-url": string;
  "paypal-auth-algo": string;
}

const cert_cache = new Map<string, string>();

async function download_and_cache_cert(cert_url: string): Promise<string> {
  if (cert_cache.has(cert_url)) {
    return cert_cache.get(cert_url)!;
  }

  const response = await fetch(cert_url);
  if (!response.ok) {
    throw new Error(`Failed to download certificate: ${response.statusText}`);
  }

  const cert = await response.text();
  cert_cache.set(cert_url, cert);

  return cert;
}

async function verify_webhook_signature(
  raw_body_buffer: Buffer,
  headers: PayPalWebhookHeaders
): Promise<boolean> {
  try {
    const transmission_id = headers["paypal-transmission-id"];
    const timestamp = headers["paypal-transmission-time"];
    const webhook_id = paypal_envs.webhook_id;
    const cert_url = headers["paypal-cert-url"];
    const signature = headers["paypal-transmission-sig"];

    if (
      !transmission_id ||
      !timestamp ||
      !webhook_id ||
      !cert_url ||
      !signature
    ) {
      console.error("[paypal webhook] missing required headers or webhook_id");
      return false;
    }

    const crc_value = crc32(raw_body_buffer);
    const message = [transmission_id, timestamp, webhook_id, crc_value].join(
      "|"
    );

    const cert = await download_and_cache_cert(cert_url);
    const verifier = crypto.createVerify("SHA256");
    verifier.update(message);

    const signature_buffer = Buffer.from(signature, "base64");
    const is_valid = verifier.verify(cert, signature_buffer);

    if (!is_valid) {
      console.error("[paypal webhook] signature verification failed");
    }

    return is_valid;
  } catch (error) {
    console.error("[paypal webhook] signature verification error:", error);
    return false;
  }
}

async function handle_payment_capture_completed(
  event: PaymentCaptureCompletedEvent
): Promise<void> {
  const capture = event.resource;
  const order_id = capture.supplementary_data.related_ids.order_id;

  const breakdown = capture.seller_receivable_breakdown;

  console.info("[paypal webhook] payment captured:", {
    order_id,
    capture_id: capture.id,
    payee_email: capture.payee.email_address,
    gross_amount: `${breakdown.gross_amount.value} ${breakdown.gross_amount.currency_code}`,
    fee: `${breakdown.paypal_fee.value} ${breakdown.paypal_fee.currency_code}`,
    net_amount: `${breakdown.net_amount.value} ${breakdown.net_amount.currency_code}`,
  });
}

async function handle_checkout_order_approved(
  event: CheckoutOrderApprovedEvent
): Promise<void> {
  const order = event.resource;
  const purchase_unit = order.purchase_units[0];
  const amount = purchase_unit?.amount;
  const shipping = purchase_unit?.shipping;

  console.info("[paypal webhook] order approved:", {
    order_id: order.id,
    buyer_email: order.payer.email_address,
    buyer_name: `${order.payer.name.given_name} ${order.payer.name.surname}`,
    payer_id: order.payer.payer_id,
    gross_amount: amount
      ? `${amount.value} ${amount.currency_code}`
      : undefined,
    shipping_address: shipping?.address
      ? {
          line_1: shipping.address.address_line_1,
          line_2: shipping.address.address_line_2,
          city: shipping.address.admin_area_2,
          state: shipping.address.admin_area_1,
          postal_code: shipping.address.postal_code,
          country: shipping.address.country_code,
        }
      : undefined,
  });
}

async function process_webhook_event(event: PayPalWebhookEvent): Promise<void> {
  switch (event.event_type) {
    case "CHECKOUT.ORDER.APPROVED":
      await handle_checkout_order_approved(event as CheckoutOrderApprovedEvent);
      break;

    case "PAYMENT.CAPTURE.COMPLETED":
      await handle_payment_capture_completed(
        event as PaymentCaptureCompletedEvent
      );
      break;

    case "PAYMENT.CAPTURE.DENIED":
      console.info("[paypal webhook] payment capture denied:", event.id);
      break;

    case "PAYMENT.CAPTURE.REFUNDED":
      console.info("[paypal webhook] payment capture refunded:", event.id);
      break;

    case "PAYMENT.CAPTURE.REVERSED":
      console.info("[paypal webhook] payment capture reversed:", event.id);
      break;

    default:
      console.info("[paypal webhook] unhandled event type:", event.event_type);
  }
}

export const action: ActionFunction = async ({ request }) => {
  try {
    const array_buffer = await request.arrayBuffer();
    const raw_body_buffer = Buffer.from(array_buffer);
    const raw_body = raw_body_buffer.toString("utf8");

    const headers = {
      "paypal-transmission-id":
        request.headers.get("paypal-transmission-id") || "",
      "paypal-transmission-time":
        request.headers.get("paypal-transmission-time") || "",
      "paypal-transmission-sig":
        request.headers.get("paypal-transmission-sig") || "",
      "paypal-cert-url": request.headers.get("paypal-cert-url") || "",
      "paypal-auth-algo": request.headers.get("paypal-auth-algo") || "",
    };

    const event = JSON.parse(raw_body) as PayPalWebhookEvent;

    console.info("[paypal webhook] received:", {
      event_id: event.id,
      event_type: event.event_type,
    });

    const is_valid = await verify_webhook_signature(raw_body_buffer, headers);

    if (!is_valid) {
      console.error("[paypal webhook] invalid signature for event:", event.id);
      return new Response(null, { status: 200 });
    }

    console.info("[paypal webhook] signature verified");

    await process_webhook_event(event);

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("[paypal webhook] error processing webhook:", error);
    return new Response(null, { status: 200 });
  }
};
