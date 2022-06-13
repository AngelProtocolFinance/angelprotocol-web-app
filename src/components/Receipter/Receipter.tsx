// import { ReceiptStage } from "types/transaction";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { PrevTxDetails, ReceipterValues } from "./types";
import ReceiptForm from "./ReceiptForm";
import { schema } from "./schema";

export default function Receipter(props: { prevTx?: PrevTxDetails }) {
  const methods = useForm<ReceipterValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      //keep txId for receipt request that come from tx history
      transactionId: props.prevTx?.txHash || "",
      fullName: "",
      email: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      consent_marketing: false,
      consent_tax: false,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <ReceiptForm />
    </FormProvider>
  );
}
