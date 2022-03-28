import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import FundConfigForm from "./FundConfigForm";
import { fundCreatorSchema, FundConfigValues } from "./fundconfigSchema";

export default function FundConfigurer() {
  const methods = useForm<FundConfigValues>({
    resolver: yupResolver(fundCreatorSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <FundConfigForm />
    </FormProvider>
  );
}
