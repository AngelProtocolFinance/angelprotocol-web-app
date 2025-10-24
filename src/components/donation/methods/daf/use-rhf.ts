import { valibotResolver } from "@hookform/resolvers/valibot";
import { rd } from "helpers/decimal";
import { useController, useForm } from "react-hook-form";
import { usd_option } from "../../common/constants";
import type { OnIncrement } from "../../common/incrementers";
import {
  daf_donation_details,
  type DafDonationDetails as FV,
} from "../../types";

export function use_rhf(init: FV | undefined) {
  const initial: FV = {
    amount: "",
    currency: usd_option,
    tip: "",
    tip_format: "15",
    cover_processing_fee: false,
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
    defaultValues: init || initial,
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
