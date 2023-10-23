import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { TokenWithAmount } from "types/tx";
import { WithWallet } from "types/wallet";
import { FormStep } from "slices/gift";
import Form from "./Form";
import { schema } from "./schema";

export default function Purchaser({
  classes = "",
  wallet,
  ...state
}: WithWallet<FormStep> & { classes?: string }) {
  const _tokens: TokenWithAmount[] = []; //FUTURE: load tokens

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
