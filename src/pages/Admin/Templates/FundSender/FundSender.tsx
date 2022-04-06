import { yupResolver } from "@hookform/resolvers/yup";
import { denoms } from "constants/currency";
import { FormProvider, useForm } from "react-hook-form";
import FundSendForm from "./FundSendForm/FundSendForm";
import { fundSendSchema, FundSendValues } from "./fundSendSchema";

export default function FundSender() {
  const methods = useForm<FundSendValues>({
    resolver: yupResolver(fundSendSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { currency: denoms.uusd },
  });

  return (
    <FormProvider {...methods}>
      <FundSendForm />
    </FormProvider>
  );
}
