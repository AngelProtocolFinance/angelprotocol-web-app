import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { EndowmentBalance } from "types/contracts";
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
      locked: strategies_locked
        .concat(oneoff_locked)
        .map(([addr, balance]) => ({
          addr,
          balance: condenseToNum(balance),
          amount: 0,
        })),
      liquid: strategies_liquid
        .concat(oneoff_liquid)
        .map(([addr, balance]) => ({
          addr,
          balance: condenseToNum(balance),
          amount: 0,
        })),
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
