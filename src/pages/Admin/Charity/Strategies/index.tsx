import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { AccountStrategies } from "types/contracts";
import Form from "./Form";
import { StrategyFormValues, schema } from "./schema";

export const strategies: AccountStrategies = {
  locked: [
    { vault: "a", percentage: "0.5" },
    { vault: "b", percentage: "0.5" },
  ],
  liquid: [
    { vault: "a", percentage: "0.5" },
    { vault: "b", percentage: "0.5" },
  ],
};

export default function Strategies() {
  // const { endowment } = useAdminResources();

  //query strategies from registrar
  //if loading,
  //if strategies

  const methods = useForm<StrategyFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      allocations: strategies.liquid.map((l) => ({
        ...l,
        percentage: +l.percentage,
      })),
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
