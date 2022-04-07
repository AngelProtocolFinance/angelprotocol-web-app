import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "pages/Admin/components/FormError";
import FormSkeleton from "pages/Admin/components/FormSkeleton";
import { FormProvider, useForm } from "react-hook-form";
import { useCW3Config } from "services/terra/admin/queriers";
import { CW3Config } from "services/terra/admin/types";
import CW3ConfigForm from "./CW3ConfigForm";
import { cw3ConfigSchema, CW3ConfigValues } from "./cw3ConfigSchema";

export default function CW3Configurer() {
  const { cw3Config, isCW3ConfigLoading, isError } = useCW3Config();
  if (isCW3ConfigLoading) return <FormSkeleton />;
  if (isError || !cw3Config)
    return <FormError errorMessage="failed to get contract config" />;

  return <CW3ConfigContext {...cw3Config} />;
}

function CW3ConfigContext(props: CW3Config) {
  const methods = useForm<CW3ConfigValues>({
    resolver: yupResolver(cw3ConfigSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      height: props.max_voting_period.height,
      threshold: +props.threshold.absolute_percentage.percentage * 100,
    },
  });

  return (
    <FormProvider {...methods}>
      <CW3ConfigForm />
    </FormProvider>
  );
}
