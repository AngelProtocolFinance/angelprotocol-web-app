import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useWithdrawConstraints } from "services/terra/multicall/queriers";
import useWalletContext from "hooks/useWalletContext";
import WithdrawForm from "./WithdrawForm";
import { WithdrawResource, WithdrawValues, WithdrawerProps } from "./types";
import { withdrawSchema } from "./withdrawSchema";

export default function Withdrawer(props: WithdrawerProps) {
  const { withdrawContrains, isLoading, isError } = useWithdrawConstraints(
    props.account_addr
  );

  if (isLoading) return <div>loading</div>;
  if (isError || !withdrawContrains) return <div>error</div>;
  return (
    <WithdrawContext
      accountAddr={props.account_addr}
      vaultFields={withdrawContrains.vaultFields}
      vaultLimits={withdrawContrains.vaultLimits}
    />
  );
}

function WithdrawContext(props: WithdrawResource) {
  const { wallet } = useWalletContext();
  const methods = useForm<WithdrawValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      total_ust: 0,
      total_receive: 0,
      beneficiary: wallet?.address ?? "",
    },
    resolver: yupResolver(withdrawSchema),
  });
  return (
    <FormProvider {...methods}>
      <WithdrawForm {...props} />
    </FormProvider>
  );
}
