import { yupResolver } from "@hookform/resolvers/yup";
import { centsDecimals, roundDown } from "helpers/decimal";
import { useController, useForm } from "react-hook-form";
import { schema, tokenShape } from "schemas/shape";
import { object } from "yup";
import { init_token_option } from "../../common/constants";
import type { OnIncrement } from "../../common/incrementers";
import type { CryptoFormStep } from "../../types";
import type { DonateValues as DV } from "./types";

const initial: DV = {
  program: { label: "", value: "" },
  token: init_token_option,
};

type Props = CryptoFormStep;
export function use_rhf(props: Props) {
  const {
    reset,
    setValue,
    handleSubmit,
    getValues,
    trigger,
    control,
    formState: { errors },
  } = useForm<DV>({
    defaultValues: props.details || initial,
    resolver: yupResolver(
      schema<DV>({
        token: object(tokenShape()),
        //no need to validate split, restricted by slider
      })
    ),
  });

  const { field: program } = useController<DV, "program">({
    control: control,
    name: "program",
  });

  const { field: token } = useController<DV, "token">({
    control: control,
    name: "token",
  });

  const on_increment: OnIncrement = (inc) => {
    const token = getValues("token");
    const amnt = Number(token.amount);
    if (Number.isNaN(amnt)) return trigger("token", { shouldFocus: true });
    setValue("token", {
      ...token,
      amount: roundDown(amnt + inc, centsDecimals(token.rate, token.precision)),
    });
  };

  return {
    program,
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
