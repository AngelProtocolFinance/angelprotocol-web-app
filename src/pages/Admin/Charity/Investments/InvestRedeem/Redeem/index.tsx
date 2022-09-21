import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues, Redeem as TRedeem } from "./types";
import {
  AccountType,
  EndowmentBalance,
  VaultWithBalance,
} from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import { condenseToNum } from "helpers";
import Form from "./Form";
import { schema } from "./schema";

export default function Redeem() {
  const { endowmentId } = useAdminResources();
  const queryState = useBalanceQuery({ id: endowmentId });
  return (
    <QueryLoader
      queryState={queryState}
      classes={{ container: "justify-center mt-4" }}
      messages={{
        loading: "Getting vault balances",
        error: "Failed to get vault balances",
      }}
    >
      {(balance) => <FormContext {...balance} />}
    </QueryLoader>
  );
}

function FormContext({
  oneoff_liquid,
  oneoff_locked,
  strategies_liquid,
  strategies_locked,
}: EndowmentBalance) {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      redeems: [
        ...toRedeem(strategies_liquid, "liquid"),
        ...toRedeem(oneoff_liquid, "liquid"),
        ...toRedeem(strategies_locked, "locked"),
        ...toRedeem(oneoff_locked, "locked"),
      ],
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

function toRedeem(vaults: VaultWithBalance[], type: AccountType): TRedeem[] {
  return vaults.map(([addr, balance]) => ({
    vault: addr,
    balance: condenseToNum(balance),
    amount: "",
    type,
  }));
}
