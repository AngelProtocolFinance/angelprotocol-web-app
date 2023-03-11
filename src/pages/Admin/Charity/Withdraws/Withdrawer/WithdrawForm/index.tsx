import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Amount, WithdrawValues, WithdrawerProps } from "./types";
import { isConnected, useWalletContext } from "contexts/WalletContext";
import { condense, roundDown } from "helpers";
import { chainIds } from "constants/chains";
import Form from "./Form";
import { schema } from "./schema";

export default function WithdrawForm({
  balance: { cw20, native },
  type,
}: WithdrawerProps) {
  const wallet = useWalletContext();
  const { address = "", chainId = chainIds.juno } = isConnected(wallet)
    ? wallet
    : {};

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
      beneficiary: address,
      network: chainId,
      //transform to form format
      amounts: [...natives, ...cw20s],
      height: 0,
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
