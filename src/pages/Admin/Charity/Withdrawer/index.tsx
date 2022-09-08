import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Amount, Props, WithdrawValues } from "./types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { condense, roundDown } from "helpers";
import { chainIds } from "constants/chainIds";
import Form from "./Form";
import { schema } from "./schema";

export default function Withdrawer({ balance: { cw20, native }, type }: Props) {
  const { wallet } = useGetWallet();

  const cw20s: Amount[] = cw20.map((c) => ({
    type: "cw20",
    tokenId: c.address,
    balance: roundDown(condense(c.amount), 4),
    value: "",
  }));

  const natives: Amount[] = native.map((n) => ({
    type: "native",
    tokenId: n.denom,
    balance: roundDown(condense(n.amount), 4),
    value: "",
  }));

  const methods = useForm<WithdrawValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      beneficiary: wallet?.address || "",
      network: chainIds.juno,
      //transform to form format
      amounts: [...natives, ...cw20s],
      type,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
