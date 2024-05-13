import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import type { FormStep } from "slices/gift";
import type { TokenOption } from "types/tx";
import type { WithWallet } from "types/wallet";
import Form from "./Form";
import { schema } from "./schema";
import type { FormValues } from "./types";

export default function Purchaser({
  classes: _c = "",
  wallet: _w,
  ...state
}: WithWallet<FormStep> & { classes?: string }) {
  const _tokens: TokenOption[] = []; //FUTURE: load tokens

  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: state.details || {
      token: _tokens[0],
      recipient: "",
      chainID: "137",
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
