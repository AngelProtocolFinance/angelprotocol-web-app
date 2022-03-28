import { yupResolver } from "@hookform/resolvers/yup";
import useWalletContext from "hooks/useWalletContext";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from "./schema";
import { Props, WithdrawValues } from "./types";

export default function Withdrawer(props: Props) {
  const { wallet } = useWalletContext();
  const methods = useForm<WithdrawValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      account_addr: props.account_addr,
      total_ust: 0,
      total_receive: 0,
      beneficiary: wallet?.walletAddress ?? "",
      //metadata
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <props.Form />
    </FormProvider>
  );
}
