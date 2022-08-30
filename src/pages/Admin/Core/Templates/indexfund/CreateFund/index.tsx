import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FundCreatorValues } from "pages/Admin/types";
import FundCreatorForm from "./Form";
import { schema } from "./schema";

export const INIT_SPLIT = "-1";

export default function CreateFund() {
  const methods = useForm<FundCreatorValues>({
    resolver: yupResolver(schema),
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
