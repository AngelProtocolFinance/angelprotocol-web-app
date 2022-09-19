import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Allocation, AllocationsProps, StrategyFormValues } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import Form from "./Form";
import { schema } from "./schema";

export default function Allocations(props: AllocationsProps) {
  const { type } = props;
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
      isReadOnly: props.readonly,
      initialAllocations: allocations,
    },
  });

  return (
    <FormProvider {...methods}>
      <Form {...props} />
    </FormProvider>
  );
}
