// import { ReceiptStage } from "types/transaction";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { PrevTxDetails, ReceipterValues } from "./types";
import { KYCData } from "types/aws";
import ReceiptForm from "./ReceiptForm";
import { schema } from "./schema";

export default function Receipter(props: {
  prevTx?: PrevTxDetails;
  prevKYC?: KYCData;
}) {
  const methods = useForm<ReceipterValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      //keep txId for receipt request that come from tx history
      transactionId: props.prevTx?.txHash || "",
      fullName: props.prevKYC?.fullName || "",
      email: props.prevKYC?.email || "",
      streetAddress: props.prevKYC?.streetAddress || "",
      city: props.prevKYC?.city || "",
      state: props.prevKYC?.state || "",
      zipCode: props.prevKYC?.zipCode || "",
      country: props.prevKYC?.country || "",
      consent_marketing: props.prevKYC?.consent_marketing || false,
      consent_tax: props.prevKYC?.consent_tax || false,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <ReceiptForm />
    </FormProvider>
  );
}
