import type { IDonationOnHoldAttr } from "@better-giving/donation";
import type { PurchaseUnitsRequest } from "@better-giving/paypal";
import { paypal_currencies } from "constants/paypal";
import { rd } from "helpers/decimal";
import { paypal } from ".server/sdks";

export const create_order = async ({
  amount: total,
  transactionId: onhold_id,
  denomination: c,
  tipAmount: tip,
  feeAllowance: fa,
}: IDonationOnHoldAttr): Promise<string> => {
  const d = paypal_currencies[c];

  const p: PurchaseUnitsRequest = {
    custom_id: onhold_id,
    amount: {
      value: rd(total, d),
      currency_code: c,
    },
  };
  if (tip || fa) {
    p.items ||= [];
    p.items.push({
      name: "Donation",
      quantity: "1",
      unit_amount: {
        currency_code: c,
        value: rd(total, d),
      },
      category: "DONATION",
    });

    if (tip) {
      p.items.push({
        name: "Donation to Better Giving",
        quantity: "1",
        unit_amount: {
          currency_code: c,
          value: rd(tip, d),
        },
        category: "DONATION",
      });
    }
    if (fa) {
      p.items.push({
        name: "Fee coverage",
        quantity: "1",
        unit_amount: {
          currency_code: c,
          value: rd(fa, d),
        },
        category: "DONATION",
      });
    }

    if (p.amount) {
      p.amount.breakdown = {
        item_total: {
          currency_code: c,
          value: rd(total, d),
        },
      };
    }
  }
  const { id = "invalid id" } = await paypal.create_order({
    intent: "CAPTURE",
    purchase_units: [p],
  });

  return id;
};
