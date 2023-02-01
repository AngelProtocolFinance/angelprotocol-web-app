import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Allocation, AllocationsProps, StrategyFormValues } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import Form from "./Form";
import { schema } from "./schema";

export default function Allocations(props: AllocationsProps) {
  const { type } = props;
  const resource = useAdminResources<"charity">();

  const allocations: Allocation[] = resource.details[type].strats.map(
    (strat) => ({
      ...strat,
      percentage: +strat.percentage * 100,
    })
  );

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
