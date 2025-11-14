import { valibotResolver } from "@hookform/resolvers/valibot";
import { PROCESSING_RATES } from "constants/common";
import { rd } from "helpers/decimal";
import { min_fee_allowance } from "helpers/donation";
import { to_atomic } from "helpers/stripe";
import { useController, useForm } from "react-hook-form";
import type { TCustomId, TItemId } from "types/paypal";
import { safeParse } from "valibot";
import type { OnIncrement } from "../../common/incrementers";
import {
  type StripeDonationDetails as FV,
  type TFrequency,
  amount as amount_schema,
  stripe_donation_details,
  tip_val,
} from "../../types";
import { currencies } from "../paypal";

export interface ILineItem {
  name: string;
  amount_atomic: number;
}
export interface IExpress {
  /** may be empty */
  frequency: TFrequency;
  total_usd: number;
  total_atomic: number;
  /** includes tip and fee_allowance */
  total: number;
  tip: number;
  fee_allowance: number;
  items: ILineItem[];
  currency: string;
  is_partial: boolean;
}

export interface IITem {
  id: TItemId;
  name: string;
  amnt: string;
}

export interface IPayPalExpress {
  /** may be empty */
  custom_id: TCustomId;
  currency: string;
  frequency: TFrequency;
  /** sum of individual items[amnt] */
  total: string;
  items: IITem[];
  is_partial: boolean;
}

/** render  */
export const express_partial = (
  currency: string,
  unit_per_usd: number,
  frequency: TFrequency
): IExpress => {
  return {
    frequency,
    is_partial: true,
    total_usd: 1,
    tip: 0,
    fee_allowance: 0,
    total_atomic: to_atomic(unit_per_usd, currency),
    total: unit_per_usd,
    items: [],
    currency: currency.toLowerCase(),
  };
};

export const paypal_express_partial = (
  currency: string,
  unit_per_usd: number,
  frequency: TFrequency,
  custom_id: TCustomId
): IPayPalExpress => {
  const decimals = currencies[currency];
  const t = rd(unit_per_usd, decimals);
  return {
    custom_id,
    currency,
    frequency,
    total: t,
    items: [{ amnt: t, name: "Donation", id: "donation" }],
    is_partial: true,
  };
};

export function use_rhf(fv: FV, paypal_custom_id: TCustomId) {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    trigger,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<FV>({
    defaultValues: fv,
    resolver: valibotResolver(stripe_donation_details),
    criteriaMode: "all",
  });

  const { field: frequency } = useController<FV, "frequency">({
    control,
    name: "frequency",
  });

  const { field: amount } = useController<FV, "amount">({
    control,
    name: "amount",
  });

  const { field: currency } = useController<FV, "currency">({
    control,
    name: "currency",
  });

  const { field: tip_format } = useController<FV, "tip_format">({
    control,
    name: "tip_format",
  });
  const { field: cpf } = useController<FV, "cover_processing_fee">({
    control,
    name: "cover_processing_fee",
  });

  const on_increment: OnIncrement = (inc) => {
    const amnt = Number(getValues("amount"));
    if (Number.isNaN(amnt)) return trigger("amount", { shouldFocus: true });
    setValue("amount", rd(amnt + inc, 0), { shouldValidate: true });
  };

  const tip = watch("tip");
  const amnt = watch("amount");

  const stripe_express = ((...x): IExpress | null => {
    const [a, c, pf, tf, f] = x;

    if (!c.code) return null;

    const ap = safeParse(amount_schema({ required: true }), a);
    if (ap.issues) return express_partial(c.code, c.rate, f);

    const amnt = +ap.output;
    if (amnt < c.min) return express_partial(c.code, c.rate, f);

    const items: ILineItem[] = [
      {
        name: "Donation",
        amount_atomic: to_atomic(amnt, c.code),
      },
    ];

    const tipv = tip_val(tf, tip, amnt);
    if (tipv) {
      items.push({
        name: "Donation to Better Giving",
        amount_atomic: to_atomic(tipv, c.code),
      });
    }

    const mfa = pf
      ? min_fee_allowance(
          tipv + amnt,
          PROCESSING_RATES.stripe,
          PROCESSING_RATES.stripe_flat * c.rate
        )
      : 0;

    if (mfa) {
      items.push({
        name: "Fee coverage",
        amount_atomic: to_atomic(mfa, c.code),
      });
    }

    const total = amnt + tipv + mfa;
    const total_usd = total / c.rate;
    /** total_atomic should match line items */
    const total_atomic = items
      .map((x) => x.amount_atomic)
      .reduce((a, b) => a + b, 0);

    return {
      frequency: f,
      tip: tipv,
      fee_allowance: mfa,
      is_partial: false,
      total_usd,
      total_atomic,
      total,
      items,
      currency: c.code.toLowerCase(),
    };
  })(amnt, currency.value, cpf.value, tip_format.value, frequency.value);

  const paypal_express = ((...x): IPayPalExpress | null => {
    const [a, c, pf, tf, f] = x;

    if (!c.code) return null;
    const d = currencies[c.code];
    if (d === undefined) return null;

    const ap = safeParse(amount_schema({ required: true }), a);
    if (ap.issues)
      return paypal_express_partial(c.code, c.rate, f, paypal_custom_id);

    const amnt = +ap.output;
    if (amnt < c.min)
      return paypal_express_partial(c.code, c.rate, f, paypal_custom_id);

    const items: IITem[] = [
      {
        name: "Donation",
        amnt: rd(amnt, d),
        id: "donation",
      },
    ];

    const tipv = tip_val(tf, tip, amnt);
    if (tipv) {
      items.push({
        name: "Donation to Better Giving",
        amnt: rd(tipv, d),
        id: "tip",
      });
    }

    const mfa = pf
      ? min_fee_allowance(
          tipv + amnt,
          PROCESSING_RATES.paypal,
          PROCESSING_RATES.paypal_flat * c.rate
        )
      : 0;

    if (mfa) {
      items.push({
        name: "Fee coverage",
        amnt: rd(mfa, d),
        id: "fee-allowance",
      });
    }

    const total = amnt + tipv + mfa;

    return {
      custom_id: paypal_custom_id,
      currency: c.code,
      frequency: f,
      is_partial: false,
      items,
      total: rd(total, d),
    };
  })(amnt, currency.value, cpf.value, tip_format.value, frequency.value);

  return {
    frequency,
    currency,
    amount,
    on_increment,
    stripe_express,
    paypal_express,
    register,
    handleSubmit,
    setValue,
    errors,
    tip_format,
    setFocus,
    getValues,
    cpf,
    tip,
    trigger,
  };
}
