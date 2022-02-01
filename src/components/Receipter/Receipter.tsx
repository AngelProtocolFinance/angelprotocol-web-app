import { FormProvider, useForm } from "react-hook-form";
import { ReceiptStage, Step } from "services/transaction/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { Receiver, MetaData, ReceiptPayload } from "./types";
import { ReactNode } from "react";
import { currency_text } from "constants/currency";

export default function Receipter(
  props: { children: ReactNode } & ReceiptStage
) {
  //need a guarantee that this component is called when stage is Receipt
  if (props.step !== Step.receipt) throw new Error("wrong component rendered");
  const {
    txHash,
    chainId,
    details: { amount, split_liq, denom, receiver },
  } = props;

  const metaData: MetaData = {
    chainId,
    amount,
    splitLiq: split_liq,
    transactionDate: new Date().toISOString(),
    denomination: currency_text[denom],
  };
  const _receiver: Receiver =
    typeof receiver === "string"
      ? { charityId: receiver }
      : { fundId: receiver };

  const methods = useForm<ReceiptPayload>({
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
      ...metaData,
      ..._receiver,
    },
    resolver: yupResolver(schema),
  });
  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
