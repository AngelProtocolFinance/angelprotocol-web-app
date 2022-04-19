// import { ReceiptStage } from "services/transaction/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ReceiptPayload } from "types/services/apes";
import { schema } from "./schema";

export type ReceipterValues = ReceiptPayload;
export default function Receipter(props: {
  children: ReactNode;
  txHash: string;
}) {
  const { txHash } = props;

  const methods = useForm<ReceipterValues>({
    reValidateMode: "onChange",
    defaultValues: {
      //keep txId for receipt request that come from tx history
      transactionId: txHash,
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
  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
