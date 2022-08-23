import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FundSendValues } from "pages/Admin/types";
import { Denoms } from "types/lists";
import { denoms } from "constants/currency";
import FundSendForm from "./FundSendForm/FundSendForm";
import { fundSendSchema } from "./fundSendSchema";

export default function FundSender() {
  const methods = useForm<FundSendValues>({
    resolver: yupResolver(fundSendSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      currency: denoms.axlusdc as Denoms,
      haloBalance: 0,
      usdBalance: 0,
    },
  });

  return (
    <FormProvider {...methods}>
      <FundSendForm />
    </FormProvider>
  );
}
