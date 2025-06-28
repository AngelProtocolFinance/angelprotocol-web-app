import { valibotResolver } from "@hookform/resolvers/valibot";
import { roundDown } from "helpers/decimal";
import { useController, useForm } from "react-hook-form";
import { usdOption } from "../../common/constants";
import type { OnIncrement } from "../../common/incrementers";
import { daf_donation_details } from "../../types";
import type { FormValues as FV, Props } from "./types";

export function useRhf(props: Props) {
  const initial: FV = {
    amount: "",
    currency: usdOption,
    program: { label: "", value: "" },
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

  const { field: program } = useController<FV, "program">({
    control: control,
    name: "program",
  });

  const { field: amount } = useController({
    control,
    name: "amount",
  });

  const onIncrement: OnIncrement = (inc) => {
    const amntNum = Number(getValues("amount"));
    if (Number.isNaN(amntNum)) return trigger("amount", { shouldFocus: true });
    setValue("amount", roundDown(inc + amntNum, 0));
  };

  return {
    handleSubmit,
    isSubmitting,
    register,
    errors,
    //controllers
    amount,
    program,
    //utils
    onIncrement,
  };
}
