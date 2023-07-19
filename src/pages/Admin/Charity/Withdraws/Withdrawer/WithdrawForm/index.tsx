import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Amount, FV, WithdrawerProps } from "./types";
import { useAdminContext } from "pages/Admin/Context";
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
  const { endowType } = useAdminContext<"charity">();

  const amounts: Amount[] = balances.map((c) => ({
    tokenId: c.address,
    balance: roundDown(condense(c.amount)),
    value: "",
  }));

  const methods = useForm<FV>({
    mode: "onChange",
    reValidateMode: "onChange",
    values: {
      beneficiary: wallet?.address || "",
      network: chainIds.polygon,
      //transform to form format
      _amounts: "",
      endowType,
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
