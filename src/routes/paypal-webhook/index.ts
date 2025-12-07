import type { IDonationOnholdUpdate } from "@better-giving/donation";
import type {
  Capture,
  Order,
  Sale,
  Subs,
  WebhookEvent,
} from "@better-giving/paypal";
import { getUnixTime } from "date-fns";
import { resp } from "helpers/https";
import type { ISub, TInterval } from "lib/subscriptions";
import { type ActionFunction, href } from "react-router";
import { to_final } from "routes/helpers/donation";
import { verified_body } from "./helpers";
import { onholddb, subsdb } from ".server/aws/db";
import { paypal, qstash } from ".server/sdks";
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

interface IAddress {
  address_line_1?: string;
  address_line_2?: string;
  admin_area_1?: string;
  admin_area_2?: string;
  postal_code?: string;
  country_code: string;
}
interface IName {
  given_name?: string;
  surname?: string;
}

const donor_update = (
  email: string,
  name: IName | undefined,
  address?: IAddress | undefined
): IDonationOnholdUpdate => {
  const {
    address_line_1: l1,
    address_line_2: l2,
    admin_area_1: state,
    admin_area_2: city,
    postal_code: zip,
    country_code: country,
  } = address || {};

  const update: IDonationOnholdUpdate = {};

  const fn = [name?.given_name, name?.surname].filter(Boolean).join(" ") || "";
  const str = [l1, l2].filter(Boolean).join(" ") || "";
  if (fn) update.fullName = fn;
  if (str) update.streetAddress = str;
  if (city) update.city = city;
  if (state) update.state = state;
  if (zip) update.zipCode = zip;
  if (email) update.kycEmail = email;
  if (country) update.country = country;
  return update;
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

        if (!s.plan_id) return resp.status(400, "missing subscription plan id");
        const plan = await paypal.get_plan(s.plan_id);
        if (!plan) return resp.status(400, "plan not found");

        const cycle = plan.billing_cycles?.[0];
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
        if (!plan.product_id)
          return resp.status(400, "missing plan product id");

        if (!onhold_id) return resp.status(400, "missing onhold id");
        const onhold = await onholddb.item(onhold_id);
        if (!onhold) return resp.status(400, "onhold record not found");

        //create subs record
        const to_name = onhold.fund_id ? onhold.fund_name : onhold.charityName;
        if (!subscriber?.email_address)
          return resp.status(400, "missing subscriber email");

        const donor = donor_update(
          subscriber.email_address,
          subscriber.name,
          subscriber.shipping_address?.address
        );
        if (!donor.kycEmail) {
          return resp.status(400, "missing subscriber email");
        }

        // update onholddb with donor info
        await onholddb
          .update(onhold_id, donor)
          .then((res) => {
            console.info("onholddb donor info updated:", res);
          })
          .catch((err) => {
            console.error("onholddb donor update error:", err);
          });

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
          product_id: plan.product_id,
          to_id: onhold.fund_id
            ? onhold.fund_id
            : onhold.endowmentId.toString(),
          to_type: onhold.fund_id ? "fund" : "npo",
          to_name: to_name || "unknown recipient",
          platform: "paypal",
          status: "active",
          env: onhold.network,
          from_id: donor.kycEmail,
        };

        await subsdb.put(subs_db);
        return resp.status(200, `created subscription record ${subs_id}`);
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
        if (!ps.email_address)
          return resp.status(400, "missing payer email address");
        const donor = donor_update(ps.email_address, ps.name, ps.address);

        const onhold_id = purchase_units?.[0]?.custom_id;
        if (!onhold_id) {
          return resp.status(400, `missing onhold id for order: ${order_id}`);
        }
        await onholddb.update(onhold_id, donor);

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
        return resp.json(res);
      }
      case "PAYMENT.SALE.COMPLETED": {
        const {
          id: sale_id,
          billing_agreement_id: subs_id,
          transaction_fee: { value: tf } = {},
          receivable_amount: { value: net, currency: c } = {},
          exchange_rate: usdpu,
        } = ev.resource as Sale;
        if (!sale_id) return resp.status(400, "missing sale id");

        if (!net || !tf || !c)
          return resp.status(400, `missing amounts for sale: ${sale_id}`);

        const settled = ((
          r
        ): { net: number; fee: number; c: string } | null => {
          if (r) {
            return { net: +net / +r, fee: +tf / +r, c };
          }
          return { net: +net, fee: +tf, c };
        })(usdpu);

        if (!settled) {
          return resp.status(400, `settled can't be determined: ${sale_id}`);
        }

        if (!subs_id) return resp.status(400, "missing billing agreement id");
        const sub = await paypal.get_subscription(subs_id);
        if (!sub) return resp.status(400, "subscription not found");
        if (!sub.subscriber) return resp.status(400, "missing subscriber info");
        if (!sub.custom_id) return resp.status(400, "missing onhold id");
        const { email_address: email, shipping_address, name } = sub.subscriber;
        if (!email) return resp.status(400, "missing subscriber email");

        const donor = donor_update(email, name, shipping_address?.address);
        const onhold = await onholddb.update(sub.custom_id, donor);

        const final = to_final(onhold, {
          net: settled.net,
          fee: settled.fee,
          in: { hash: sale_id, id: "paypal", currency: settled.c },
        });

        const res = await qstash.publishJSON({
          body: final,
          url: `${base_url}/q/final-recorder`,
          retries: 0,
          deduplicationId: final.id,
          failureCallback: `${base_url}${href("/failure-callback")}`,
        });

        return resp.json(res);
      }
    }
    console.info(JSON.stringify(ev, null, 2));
    return resp.status(201, `event type not handled: ${ev.event_type}`);
  } catch (error) {
    console.error("[paypal webhook] error processing webhook:", error);
    return resp.status(500, "error processing webhook");
  }
};
