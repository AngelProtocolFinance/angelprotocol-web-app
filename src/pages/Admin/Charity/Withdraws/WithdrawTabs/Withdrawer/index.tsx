import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Amount, WithdrawValues, WithdrawerProps } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { condense, roundDown } from "helpers";
import { chainIds } from "constants/chainIds";
import Form from "./Form";
import { schema } from "./schema";

export default function Withdrawer({
  balance: { cw20, native },
  type,
}: WithdrawerProps) {
  const { wallet } = useAdminResources();

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
      beneficiary: wallet.address,
      network: chainIds.juno,
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
