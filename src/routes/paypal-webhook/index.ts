import type { Capture, Order, Subs, WebhookEvent } from "@better-giving/paypal";
import { getUnixTime } from "date-fns";
import { resp } from "helpers/https";
import type { ISub, TInterval } from "lib/subscriptions";
import { type ActionFunction, href } from "react-router";
import { to_final } from "routes/helpers/donation";
import { verified_body } from "./helpers";
import { onholddb, subsdb } from ".server/aws/db";
import { qstash } from ".server/sdks";
import { is_resp } from ".server/utils";

type TIntervalFrom = "DAY" | "WEEK" | "MONTH" | "YEAR";
const to_interval = (from: TIntervalFrom): TInterval => {
  switch (from) {
    case "DAY":
      return "day";
    case "WEEK":
      return "week";
    case "MONTH":
      return "month";
    case "YEAR":
      return "year";
  }
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const base_url = new URL(request.url).origin;
    const jsonstr = await verified_body(request);
    if (is_resp(jsonstr)) return jsonstr;

    const ev: WebhookEvent = JSON.parse(jsonstr);

    console.info("[paypal webhook] received:", JSON.stringify(ev, null, 2));

    switch (ev.event_type) {
      case "BILLING.SUBSCRIPTION.ACTIVATED": {
        const {
          id: subs_id,
          subscriber,
          custom_id: onhold_id,
          create_time = new Date().toISOString(),
          update_time = new Date().toISOString(),
          ...s
        } = ev.resource as Subs;
        if (!onhold_id) return resp.status(400, "missing onhold id");
        const onhold = await onholddb.item(onhold_id);
        if (!onhold) return resp.status(400, "onhold record not found");

        if (!subscriber) return resp.status(400, "missing subscriber info");
        const {
          email_address: email,
          name: n,
          shipping_address: saddr,
        } = subscriber;
        if (!email) return resp.status(400, "missing subscriber email");
        const {
          address_line_1: l1,
          address_line_2: l2,
          admin_area_1: state,
          admin_area_2: city,
          postal_code: zip,
          country_code: country,
        } = saddr?.address ?? {};

        const fn = [n?.given_name, n?.surname].filter(Boolean).join(" ") || "";
        const str = [l1, l2].filter(Boolean).join(" ") || "";

        await onholddb
          .update(email, {
            kycEmail: email,
            ...(fn && { fullName: fn }),
            ...(str && { streetAddress: str }),
            ...(city && { city }),
            ...(state && { state }),
            ...(zip && { postalCode: zip }),
            ...(country && { country }),
          })
          .catch((err) => console.error("onholddb update error:", err));
        console.info(`updated subscriber info for onhold:${onhold_id}`);

        const cycle = s.plan?.billing_cycles?.[0];
        if (!cycle) {
          return resp.status(400, "missing plan billing cycle");
        }

        const interval = cycle.frequency?.interval_unit;
        const interval_count = cycle.frequency?.interval_count || 1;
        if (!interval) {
          return resp.status(400, "missing plan frequency interval unit");
        }
        const next_billing = s.billing_info?.next_billing_time;
        if (!next_billing) {
          return resp.status(400, "missing next billing time");
        }
        if (!s.quantity) return resp.status(400, "missing subscription qty");
        const product = s.plan?.product_id;
        if (!product) return resp.status(400, "missing plan product id");
        //create subs record

        const to_name = onhold.fund_id ? onhold.fund_name : onhold.charityName;

        if (!subs_id) return resp.status(400, "missing subscription id");
        const subs_db: ISub = {
          id: subs_id,
          created_at: getUnixTime(new Date(create_time)),
          updated_at: getUnixTime(new Date(update_time)),
          interval: to_interval(interval),
          interval_count,
          next_billing: getUnixTime(new Date(next_billing)),
          amount: onhold.amount,
          amount_usd: onhold.usdValue,
          currency: onhold.denomination,
          product_id: product,
          to_id: onhold.fund_id
            ? onhold.fund_id
            : onhold.endowmentId.toString(),
          to_type: onhold.fund_id ? "fund" : "npo",
          to_name: to_name || "unknown recipient",
          platform: "paypal",
          status: "active",
          env: onhold.network,
          from_id: email,
        };

        await subsdb.put(subs_db);
        console.info(`created subscription record ${subs_id} `);
        break;
      }
      case "CHECKOUT.ORDER.APPROVED": {
        const {
          id: order_id,
          payment_source,
          purchase_units,
        } = ev.resource as Order;

        if (!order_id) return resp.status(400, "missing order id");

        const ps = payment_source?.venmo || payment_source?.paypal;

        /** we only expect paypal and venmo */
        if (!ps) return resp.status(400, "paypal and venmo not found");

        const {
          email_address: email,
          address: {
            address_line_1: l1,
            address_line_2: l2,
            admin_area_1: state,
            admin_area_2: city,
            postal_code: zip,
            country_code: country,
          } = {},
          name: n,
        } = ps;

        if (!email) {
          return resp.status(400, `missing email for order: ${order_id}`);
        }

        const onhold_id = purchase_units?.[0]?.custom_id;
        if (!onhold_id) {
          return resp.status(400, `missing onhold id for order: ${order_id}`);
        }

        const onhold = await onholddb.item(onhold_id);
        if (!onhold) {
          return resp.status(
            201,
            `onhold missing or has been processed: ${order_id}`
          );
        }
        const fn = [n?.given_name, n?.surname].filter(Boolean).join(" ") || "";
        const str = [l1, l2].filter(Boolean).join(" ") || "";
        //update donor info
        const res = await onholddb.update(onhold_id, {
          kycEmail: email,
          ...(fn && { fullName: fn }),
          ...(str && { streetAddress: str }),
          ...(city && { city }),
          ...(state && { state }),
          ...(zip && { postalCode: zip }),
          ...(country && { country }),
        });
        console.info(res);
        return resp.status(200, "updated onhold donor info");
      }
      case "PAYMENT.CAPTURE.COMPLETED": {
        const {
          id: cid,
          custom_id: onhold_id,
          seller_receivable_breakdown: b,
        } = ev.resource as Capture;
        if (!cid) return resp.status(400, "missing capture id");

        if (!onhold_id)
          return resp.status(400, `missing onhold id for capture: ${cid}`);

        const onhold = await onholddb.item(onhold_id);
        if (!onhold)
          return resp.status(
            201,
            `onhold missing or has been processed: ${cid}`
          );

        if (!b || !b.net_amount || !b.paypal_fee) {
          return resp.status(400, `missing breakdown for capture ${cid}`);
        }
        const settled = ((
          r
        ): { net: number; fee: number; c: string } | null => {
          const n = b.net_amount.value;
          const p = b.paypal_fee.value;
          const c = b.net_amount.currency_code;
          if (r) {
            return { net: +n * +r, fee: +p * +r, c };
          }
          return { net: +n, fee: +p, c };
        })(b.exchange_rate?.value);

        if (!settled) {
          return resp.status(400, `settled can't be determined: ${cid}`);
        }

        const final = to_final(onhold, {
          net: settled.net,
          fee: settled.fee,
          in: { hash: cid, id: "paypal", currency: settled.c },
        });

        const res = await qstash.publishJSON({
          body: final,
          url: `${base_url}/q/final-recorder`,
          retries: 0,
          deduplicationId: final.id,
          failureCallback: `${base_url}${href("/failure-callback")}`,
        });

        console.info(`Final donation record sent:${res.messageId}`);
        return resp.status(200, "processed");
      }
    }
    console.info(JSON.stringify(ev, null, 2));
    return resp.status(201, "event type not processed");
  } catch (error) {
    console.error("[paypal webhook] error processing webhook:", error);
    return resp.status(500, "error processing webhook");
  }
};
