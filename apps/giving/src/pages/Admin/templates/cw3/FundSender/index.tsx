import { axlUSDCDenom } from "@ap/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FundSendValues } from "@ap/types/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function FundSender() {
  const methods = useForm<FundSendValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      denom: axlUSDCDenom,
      haloBalance: 0,
      usdBalance: 0,
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
