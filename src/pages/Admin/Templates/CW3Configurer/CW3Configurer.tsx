import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { CW3Config } from "types/services/terra/admin";
import FormError from "pages/Admin/components/FormError";
import FormSkeleton from "pages/Admin/components/FormSkeleton";
import { useCW3Config } from "services/terra/admin/queriers";
import CW3ConfigForm from "./CW3ConfigForm";
import {
  CW3ConfigPayload,
  CW3ConfigValues,
  cw3ConfigSchema,
} from "./cw3ConfigSchema";

export default function CW3Configurer() {
  const { cw3Config, isCW3ConfigLoading, isError } = useCW3Config();
  if (isCW3ConfigLoading) return <FormSkeleton />;
  if (isError || !cw3Config)
    return <FormError errorMessage="failed to get contract config" />;

  return <CW3ConfigContext {...cw3Config} />;
}

function CW3ConfigContext(props: CW3Config) {
  const initialCW3Config: CW3ConfigPayload = {
    threshold: +props.threshold.absolute_percentage.percentage * 100,
    height: props.max_voting_period.height,
  };

  const methods = useForm<CW3ConfigValues>({
    resolver: yupResolver(cw3ConfigSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      ...initialCW3Config,
      initialCW3Config,
    },
  });

  return (
    <FormProvider {...methods}>
      <CW3ConfigForm />
    </FormProvider>
  );
}
