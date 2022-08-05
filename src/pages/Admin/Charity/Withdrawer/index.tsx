import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Amount, Props, WithdrawValues } from "./types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Form from "./Form";
import { schema } from "./schema";

export default function Withdrawer({ balance: { cw20, native } }: Props) {
  const { wallet } = useGetWallet();

  const cw20s: Amount[] = cw20.map((c) => ({
    type: "cw20",
    id: c.address,
    balance: c.amount,
    amount: "",
  }));

  const natives: Amount[] = native.map((n) => ({
    type: "native",
    id: n.denom,
    balance: n.amount,
    amount: "",
  }));

  const methods = useForm<WithdrawValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      beneficiary: wallet?.address || "",
      network: "juno",
      //transform to form format
      amounts: [...natives, ...cw20s],
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
