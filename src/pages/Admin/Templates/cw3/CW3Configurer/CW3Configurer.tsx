import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { CW3ConfigPayload, CW3ConfigValues } from "pages/Admin/types";
import { CW3Config } from "types/server/contracts";
import { useAdminResources } from "pages/Admin/AdminGuard";
import FormError from "pages/Admin/common/FormError";
import FormSkeleton from "pages/Admin/common/FormSkeleton";
import { useCw3ConfigQuery } from "services/juno/cw3";
import CW3 from "contracts/CW3";
import CW3ConfigForm from "./CW3ConfigForm";
import { cw3ConfigSchema } from "./cw3ConfigSchema";

export default function CW3Configurer() {
  const { cw3 } = useAdminResources();
  const contract = new CW3(undefined, cw3);
  const {
    data: cw3Config,
    isLoading,
    isError,
  } = useCw3ConfigQuery(contract.config);
  if (isLoading) return <FormSkeleton />;
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
