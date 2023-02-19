import { FormError, FormSkeleton } from "@ap/components/admin";
import { useRegistrarConfigQuery } from "@ap/services/juno";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { RegistrarOwnerValues } from "@ap/types/admin";
import { RegistrarConfig } from "@ap/types/contracts";
import Form from "./Form";
import { schema } from "./schema";

export default function Owner() {
  const { data: config, isLoading, isError } = useRegistrarConfigQuery(null);
  if (isLoading) return <FormSkeleton />;
  if (isError || !config)
    return <FormError errorMessage="failed to load registrar config" />;
  return <RegistrarOwnerContext {...config} />;
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
