import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { RegistrarOwnerValues } from "pages/Admin/types";
import { RegistrarConfig } from "types/contracts";
import { useRegistrarConfig } from "services/juno/registrar/queriers";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function Owner() {
  const { registrarConfig, isLoading, isError } = useRegistrarConfig();
  if (isLoading) return <FormSkeleton />;
  if (isError || !registrarConfig)
    return <FormError errorMessage="failed to load registrar config" />;
  return <RegistrarOwnerContext {...registrarConfig} />;
}

function RegistrarOwnerContext(props: RegistrarConfig) {
  const methods = useForm<RegistrarOwnerValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { initialOwner: props.owner },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
