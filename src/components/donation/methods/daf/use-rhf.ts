import { valibotResolver } from "@hookform/resolvers/valibot";
import { rd } from "helpers/decimal";
import { useController, useForm } from "react-hook-form";
import type { OnIncrement } from "../../common/incrementers";
import {
  type DafDonationDetails as FV,
  daf_donation_details,
} from "../../types";

export function use_rhf(init: FV | undefined, hide_bg_tip: boolean) {
  const initial: FV = {
    amount: "",
    tip: "",
    tip_format: hide_bg_tip ? "none" : "15",
    cover_processing_fee: false,
  };

  const {
    register,
    control,
    handleSubmit,
    getValues,
    trigger,
    setValue,
    setFocus,
    formState: { isSubmitting, errors },
  } = useForm<FV>({
    defaultValues: init || initial,
    resolver: valibotResolver(daf_donation_details),
    criteriaMode: "all",
  });

  const { field: amount } = useController({
    control,
    name: "amount",
  });
  const { field: tip_format } = useController({
    control,
    name: "tip_format",
  });

  const { field: cpf } = useController({
    control,
    name: "cover_processing_fee",
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
    setValue,
    getValues,
    setFocus,
    //controllers
    amount,
    cpf,
    tip_format,
    //utils
    on_increment,
  };
}
