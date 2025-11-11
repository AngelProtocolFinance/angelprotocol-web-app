import { valibotResolver } from "@hookform/resolvers/valibot";
import { PROCESSING_RATES } from "constants/common";
import { rd, ru_vdec } from "helpers/decimal";
import { min_fee_allowance } from "helpers/donation";
import { to_atomic } from "helpers/stripe";
import { useController, useForm } from "react-hook-form";
import { safeParse } from "valibot";
import { usd_option } from "../../common/constants";
import type { OnIncrement } from "../../common/incrementers";
import {
  type StripeDonationDetails as FV,
  type TFrequency,
  amount as amount_schema,
  stripe_donation_details,
  tip_val,
} from "../../types";

export interface ILineItem {
  name: string;
  amount: number;
  amount_usd: number;
}
export interface IAmntExpress {
  /** may be empty */
  frequency: TFrequency;
  total_usd: number;
  total_atomic: number;
  /** includes tip and fee_allowance */
  total: number;
  items: ILineItem[];
  currency: string;
  is_partial: boolean;
}

/** render  */
export const amnt_express_partial = (
  currency: string,
  unit_per_usd: number,
  frequency: TFrequency
): IAmntExpress => {
  return {
    frequency,
    is_partial: true,
    total_usd: 1,
    total_atomic: to_atomic(unit_per_usd, currency),
    total: unit_per_usd,
    items: [],
    currency: currency.toLowerCase(),
  };
};

export function use_rhf(init: FV | undefined, hide_bg_tip: boolean) {
  const initial: FV = {
    amount: "",
    currency: usd_option,
    frequency: "" as FV["frequency"],
    tip: "",
    cover_processing_fee: false,
    tip_format: hide_bg_tip ? "none" : "15",
  };

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
    defaultValues: init || initial,
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

  const amnt_express = ((...x): IAmntExpress | null => {
    const [a, c, pf, tf, f] = x;

    if (!c.code) return null;

    const ap = safeParse(amount_schema({ required: true }), a);
    if (ap.issues) return amnt_express_partial(c.code, c.rate, f);

    const amnt = +ap.output;
    if (amnt < c.min) return amnt_express_partial(c.code, c.rate, f);

    const items: ILineItem[] = [
      {
        name: "Amount",
        amount: amnt,
        amount_usd: amnt / c.rate,
      },
    ];

    const tipv = tip_val(tf, tip, amnt);
    if (tipv) {
      items.push({
        name: "Tip",
        amount: tipv,
        amount_usd: tipv / c.rate,
      });
    }

    // const tipv_usd = tipv / c.rate;

    const mfa = pf
      ? min_fee_allowance(
          tipv + amnt,
          PROCESSING_RATES.stripe,
          PROCESSING_RATES.stripe_flat * c.rate
        )
      : 0;

    if (mfa) {
      items.push({
        name: "fee coverage",
        amount: mfa,
        amount_usd: mfa / c.rate,
      });
    }

    const total = amnt + tipv + mfa;
    const total_usd = total / c.rate;
    const total_atomic = to_atomic(total, c.code);

    return {
      frequency: f,
      is_partial: false,
      total_usd,
      total_atomic,
      total,
      items,
      currency: c.code.toLowerCase(),
    };
  })(amnt, currency.value, cpf.value, tip_format.value, frequency.value);

  console.log(amnt_express);
  return {
    frequency,
    currency,
    amount,
    on_increment,
    amnt_express,
    register,
    handleSubmit,
    setValue,
    errors,
    tip_format,
    setFocus,
    getValues,
    cpf,
    tip,
  };
}
