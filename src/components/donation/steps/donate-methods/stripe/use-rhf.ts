import { valibotResolver } from "@hookform/resolvers/valibot";
import { rd } from "helpers/decimal";
import { useController, useForm } from "react-hook-form";
import { usd_option } from "../../common/constants";
import type { OnIncrement } from "../../common/incrementers";
import { stripe_donation_details } from "../../types";
import type { FormValues as FV, Props } from "./types";

export function use_rhf(props: Props) {
  const initial: FV = {
    amount: "",
    currency: usd_option,
    frequency: "" as FV["frequency"],
    first_name: "",
    last_name: "",
    email: "",
    tip: "",
    cover_processing_fee: false,
    tip_format: "15",
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
    defaultValues: props.details || initial,
    resolver: valibotResolver(stripe_donation_details),
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

  return {
    frequency,
    currency,
    amount,
    on_increment,
    register,
    handleSubmit,
    setValue,
    errors,
    tip_format,
    setFocus,
    cpf,
    tip,
  };
}
