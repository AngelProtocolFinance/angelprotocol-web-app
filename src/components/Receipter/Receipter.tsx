import { FormProvider, useForm } from "react-hook-form";
import { ReceiptStage, Step } from "services/transaction/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { Values } from "./types";
import { ReactNode } from "react";

export default function Receipter(
  props: { children: ReactNode } & ReceiptStage
) {
  if (props.step !== Step.receipt) throw new Error("wrong component rendered");
  const {
    chainId,
    txHash,
    details: { amount, split_liq },
    //need a guarantee that this component is called when stage is Receipt
  } = props;

  const methods = useForm<Values>({
    reValidateMode: "onChange",
    defaultValues: {
      amount: parseInt(amount || ""),
      splitLiq: split_liq,
      transactionDate: new Date().toISOString(),
      transactionId: txHash,
      chainId: chainId,
      fullName: "",
      email: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      denomination: "UST",
    },
    resolver: yupResolver(schema),
  });
  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
