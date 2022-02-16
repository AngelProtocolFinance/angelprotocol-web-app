import { FormProvider, useForm } from "react-hook-form";
import { ReceiptStage, Step } from "services/transaction/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { ReactNode } from "react";
import { Values } from "./types";

export default function Receipter(
  props: { children: ReactNode } & ReceiptStage
) {
  //need a guarantee that this component is called when stage is Receipt
  if (props.step !== Step.receipt) throw new Error("wrong component rendered");
  const { txHash } = props;

  const methods = useForm<Values>({
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
    },
    resolver: yupResolver(schema),
  });
  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
