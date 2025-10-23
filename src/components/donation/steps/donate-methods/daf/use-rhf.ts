import { valibotResolver } from "@hookform/resolvers/valibot";
import { rd } from "helpers/decimal";
import { useController, useForm } from "react-hook-form";
import { init_donation_fv, usd_option } from "../../common/constants";
import type { OnIncrement } from "../../common/incrementers";
import { daf_donation_details } from "../../types";
import type { FormValues as FV, Props } from "./types";

export function use_rhf(props: Props) {
  const initial: FV = {
    amount: "",
    currency: usd_option,
    ...init_donation_fv,
  };

  const {
    register,
    control,
    handleSubmit,
    getValues,
    trigger,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FV>({
    defaultValues: props.details || initial,
    resolver: valibotResolver(daf_donation_details),
  });

  const { field: amount } = useController({
    control,
    name: "amount",
  });

  const on_increment: OnIncrement = (inc) => {
    const amnt = Number(getValues("amount"));
    if (Number.isNaN(amnt)) return trigger("amount", { shouldFocus: true });
    setValue("amount", rd(inc + amnt, 0), { shouldValidate: true });
  };

  return {
    handleSubmit,
    isSubmitting,
    register,
    errors,
    //controllers
    amount,
    //utils
    on_increment,
  };
}
