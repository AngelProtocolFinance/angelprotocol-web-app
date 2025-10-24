import { valibotResolver } from "@hookform/resolvers/valibot";
import { rd, vdec } from "helpers/decimal";
import { useController, useForm } from "react-hook-form";
import { init_donation_fv, init_token_option } from "../../common/constants";
import type { OnIncrement } from "../../common/incrementers";
import {
  type CryptoDonationDetails as FV,
  crypto_donation_details,
} from "../../types";

const initial: FV = {
  token: init_token_option,
  ...init_donation_fv,
};

export function use_rhf(init?: FV) {
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
