// import { ReceiptStage } from "types/transaction";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Props, ReceipterValues } from "./types";
import ReceiptForm from "./Form";
import { schema } from "./schema";

export default function Receipter(props: Props) {
  const methods = useForm<ReceipterValues>({
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
