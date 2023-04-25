import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { TokenWithAmount } from "types/slices";
import { FormStep } from "slices/donation";
import { fiatTokens } from "constants/tokens";
import { ConfigParams } from "..";
import Form from "./Form";
import { schema } from "./schema";

export default function Donater({
  config: { hideAdvOpts = false, liquidPct = 0, unfoldAdvOpts = false },
  ...state
}: FormStep & { config: ConfigParams }) {
  const _tokens: TokenWithAmount[] = [...fiatTokens];

  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: state.details || {
      token: _tokens[0],
      pctLiquidSplit: liquidPct,

      //meta
      // if availCurrs array was not set, include all
      // otherwise, include only tokens in the availCurrs array + the fee-paying coin
      tokens: _tokens,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form hideAdvOpts={hideAdvOpts} unfoldAdvOpts={unfoldAdvOpts} />
    </FormProvider>
  );
}
