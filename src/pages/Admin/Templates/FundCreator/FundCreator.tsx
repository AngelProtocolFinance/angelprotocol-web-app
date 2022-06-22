import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FundCreatorValues } from "pages/Admin/types";
import FundCreatorForm from "./FundCreatorForm";
import { fundCreatorSchema } from "./fundCreatorSchema";

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
