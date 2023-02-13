import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Allocation, FormValues, Props } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import Form from "./Form";
import { schema } from "./schema";

export default function Allocations(props: Props) {
  const { type } = props;
  const { strategies } = useAdminResources<"charity">();

  const allocations: Allocation[] = strategies[type].map((strat) => ({
    ...strat,
    percentage: +strat.percentage * 100,
  }));

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      allocations,
    },
  });

  return (
    <FormProvider {...methods}>
      <Form {...props} />
    </FormProvider>
  );
}
