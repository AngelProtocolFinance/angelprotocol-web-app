import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Props, WithdrawValues } from "./types";
import { schema } from "./schema";
import { useConnectedWallet } from "@terra-money/wallet-provider";

export default function Withdrawer(props: Props) {
  const wallet = useConnectedWallet();
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
