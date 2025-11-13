import { valibotResolver } from "@hookform/resolvers/valibot";
import { rd, vdec } from "helpers/decimal";
import { useController, useForm } from "react-hook-form";
import { init_token_option } from "../../common/constants";
import type { OnIncrement } from "../../common/incrementers";
import {
  type CryptoDonationDetails as FV,
  type IUser,
  crypto_donation_details,
} from "../../types";

export function use_rhf(
  init: FV | undefined,
  user: IUser | undefined,
  hide_bg_tip: boolean
) {
  const initial: FV = {
    token: init_token_option,
    tip: "",
    tip_format: hide_bg_tip ? "none" : "15",
    cover_processing_fee: false,
  };

  const {
    reset,
    setValue,
    handleSubmit,
    getValues,
    trigger,
    control,
    setFocus,
    register,
    formState: { errors },
  } = useForm<FV>({
    defaultValues: init || initial,
    resolver: valibotResolver(crypto_donation_details),
    criteriaMode: "all",
  });

  const { field: token } = useController<FV, "token">({
    control: control,
    name: "token",
  });

  const { field: cpf } = useController({
    control: control,
    name: "cover_processing_fee",
  });

  const { field: tip_format } = useController({
    control: control,
    name: "tip_format",
  });

  const on_increment: OnIncrement = (inc) => {
    const token = getValues("token");
    const amnt = Number(token.amount);
    if (Number.isNaN(amnt)) return trigger("token", { shouldFocus: true });
    setValue(
      "token",
      {
        ...token,
        amount: rd(amnt + inc, vdec(token.rate, token.precision)),
      },
      { shouldValidate: true }
    );
  };

  return {
    reset,
    setValue,
    handleSubmit,
    errors,
    getValues,
    setFocus,
    register,

    //controllers
    token,
    tip_format,
    cpf,

    //utils
    on_increment,
  };
}
