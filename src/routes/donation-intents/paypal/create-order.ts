import type { PurchaseUnitsRequest } from "@better-giving/paypal";
import { paypal_currencies } from "constants/paypal";
import { rd } from "helpers/decimal";
import { paypal } from ".server/sdks";

interface IInput {
  onhold_id: string;
  amount: number;
  fee_allowance: number;
  tip: number;
  currency: string;
}

export const create_order = async ({
  onhold_id,
  amount,
  currency: c,
  tip,
  fee_allowance: fa,
}: IInput): Promise<string> => {
  const d = paypal_currencies[c];
  const total = amount + tip + fa;

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
        value: rd(amount, d),
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
