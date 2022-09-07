import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { Allocation, StrategyFormValues } from "./types";
import { AdminParams } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { getAccounType } from "../helpers";
import Form from "./Form";
import { schema } from "./schema";

export default function AllocEditor() {
  const { endowment } = useAdminResources();
  const { type } = useParams<AdminParams>();
  const accountType = getAccounType(type);
  const { state } = useLocation();
  console.log(state);

  const allocations: Allocation[] = endowment.strategies[accountType].map(
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
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
