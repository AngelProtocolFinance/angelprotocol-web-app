import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import FundCreatorForm from "./FundCreatorForm";
import { fundCreatorSchema, FundCreatorValues } from "./fundCreatorSchema";

export const INIT_SPLIT = "-1";

export default function FundCreator() {
  const methods = useForm<FundCreatorValues>({
    resolver: yupResolver(fundCreatorSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      splitToLiquid: INIT_SPLIT,
    },
  });

  return (
    <FormProvider {...methods}>
      <FundCreatorForm />
    </FormProvider>
  );
}
