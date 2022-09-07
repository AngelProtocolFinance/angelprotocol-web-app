import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { StrategyFormValues } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import Form from "./Form";
import { schema } from "./schema";

export default function AllocEditor() {
  const { endowment } = useAdminResources();

  const methods = useForm<StrategyFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      allocations: endowment.strategies.liquid.map((l) => ({
        ...l,
        percentage: +l.percentage * 100,
      })),
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
