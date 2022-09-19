import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Allocation, StrategyFormValues } from "./types";
import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import Form from "./Form";
import { schema } from "./schema";

type Props = { type: AccountType };
export default function Allocations({ type }: Props) {
  const { endowment } = useAdminResources();

  const allocations: Allocation[] = endowment.strategies[type].map((strat) => ({
    ...strat,
    percentage: +strat.percentage * 100,
  }));

  const methods = useForm<StrategyFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      allocations,
    },
  });

  return (
    <FormProvider {...methods}>
      <Form type={type} />
    </FormProvider>
  );
}
