import { valibotResolver } from "@hookform/resolvers/valibot";
import { roundDown } from "helpers/decimal";
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
    program: { label: "", value: "" },
  };

  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FV>({
    defaultValues: props.details || initial,
    resolver: valibotResolver(stripe_donation_details),
  });

  const { field: frequency } = useController<FV, "frequency">({
    control,
    name: "frequency",
  });

  const { field: currency } = useController<FV, "currency">({
    control,
    name: "currency",
  });

  const { field: program } = useController<FV, "program">({
    control,
    name: "program",
  });

  const { field: amount } = useController<FV, "amount">({
    control,
    name: "amount",
  });

  const on_increment: OnIncrement = (inc) => {
    const amntNum = Number(getValues("amount"));
    if (Number.isNaN(amntNum)) return trigger("amount", { shouldFocus: true });
    setValue("amount", roundDown(amntNum + inc, 0));
  };

  return {
    frequency,
    currency,
    program,
    amount,
    on_increment,
    register,
    handleSubmit,
    errors,
  };
}
