import { yupResolver } from "@hookform/resolvers/yup";
import { rd, vdec } from "helpers/decimal";
import { useController, useForm } from "react-hook-form";
import { schema, token_shape } from "schemas/shape";
import { object } from "yup";
import { init_donation_fv, init_token_option } from "../../common/constants";
import type { OnIncrement } from "../../common/incrementers";
import type { CryptoDonationDetails as FV } from "../../types";

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
    formState: { errors },
  } = useForm<FV>({
    defaultValues: init || initial,
    resolver: yupResolver(
      schema<FV>({
        token: object(token_shape()),
        //no need to validate split, restricted by slider
      })
    ),
  });

  const { field: token } = useController<FV, "token">({
    control: control,
    name: "token",
  });

  const on_increment: OnIncrement = (inc) => {
    const token = getValues("token");
    const amnt = Number(token.amount);
    if (Number.isNaN(amnt)) return trigger("token", { shouldFocus: true });
    setValue("token", {
      ...token,
      amount: rd(amnt + inc, vdec(token.rate, token.precision)),
    });
  };

  return {
    reset,
    setValue,
    handleSubmit,
    token,
    on_increment,
    errors: {
      token: errors.token?.amount?.message || errors.token?.id?.message,
    },
  };
}
