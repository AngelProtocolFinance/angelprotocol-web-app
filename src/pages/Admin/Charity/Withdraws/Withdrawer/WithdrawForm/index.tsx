import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Amount, FV, WithdrawerProps } from "./types";
import { useGetWallet } from "contexts/WalletContext";
import { condense, roundDown } from "helpers";
import { chainIds } from "constants/chainIds";
import Form from "./Form";
import { schema } from "./schema";

export default function WithdrawForm({
  classes = "",
  balances,
  type,
  fees,
}: WithdrawerProps & { classes?: string }) {
  const { wallet } = useGetWallet();

  const amounts: Amount[] = balances.map((c) => ({
    tokenId: c.address,
    balance: roundDown(condense(c.amount)),
    value: "",
  }));

  const methods = useForm<FV>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      beneficiary: wallet?.address || "",
      network: chainIds.polygon,
      //transform to form format
      amounts,
      type,
      fees,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form classes={classes} />
    </FormProvider>
  );
}
