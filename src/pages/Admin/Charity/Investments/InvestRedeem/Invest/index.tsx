import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Balance, FormValues } from "./types";
import { EndowmentBalance } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import QueryLoader from "components/QueryLoader";
import { condenseToNum } from "helpers";
import Form from "./Form";
import { schema } from "./schema";

export default function Invest() {
  const { id } = useAdminResources();
  const queryState = useBalanceQuery({ id });
  return (
    <QueryLoader
      queryState={queryState}
      classes={{ container: "justify-center mt-4" }}
      messages={{
        loading: "Fetching balances",
        error: "Failed to get balances",
      }}
    >
      {(balance) => <FormContext {...balance} />}
    </QueryLoader>
  );
}

function FormContext(props: EndowmentBalance) {
  const balance: Balance = {
    locked: condenseToNum(props.tokens_on_hand.locked.native[0].amount || "0"),
    liquid: condenseToNum(props.tokens_on_hand.liquid.native[0].amount || "0"),
  };
  const methods = useForm<FormValues, { balance: Balance }>({
    resolver: yupResolver(schema),
    context: { balance },
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      investments: [],
      balance,
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
