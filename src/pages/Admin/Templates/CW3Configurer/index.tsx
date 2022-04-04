import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import CW3ConfigForm from "./CW3ConfigForm";
import { fundConfigSchema, CW3ConfigValues } from "./cw3ConfigSchema";

export default function CW3Configurer() {
  const methods = useForm<CW3ConfigValues>({
    resolver: yupResolver(fundConfigSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <CW3ConfigForm />
    </FormProvider>
  );
}
