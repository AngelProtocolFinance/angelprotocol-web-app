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
  merchant_id: string;
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

interface PayPalWebhookEvent<T = unknown> {
  id: string;
  event_type: string;
  resource: T;
}

type PaymentCaptureCompletedEvent = PayPalWebhookEvent<PayPalCaptureResource>;

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

async function process_webhook_event(event: PayPalWebhookEvent): Promise<void> {
  switch (event.event_type) {
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
