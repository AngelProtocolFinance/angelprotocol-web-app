// import { ReceiptStage } from "types/transaction";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues, Props } from "./types";
import ReceiptForm from "./Form";
import { schema } from "./schema";

export default function KYC(props: Props) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      consent_marketing: false,
      consent_tax: false,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <ReceiptForm {...props} />
    </FormProvider>
  );
}
