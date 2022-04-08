import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "pages/Admin/components/FormError";
import FormSkeleton from "pages/Admin/components/FormSkeleton";
import { FormProvider, useForm } from "react-hook-form";
import { useRegistrarConfig } from "services/terra/registrar/queriers";
import { RegistrarConfig } from "services/terra/registrar/types";
import OwnerUpdateForm from "./OwnerUpdateForm";
import { RegistrarOwnerValues, updateOwnerSchema } from "./updateOwnerSchema";

export default function RegistrarOwner() {
  const { registrarConfig, isLoading, isError } = useRegistrarConfig();
  if (isLoading) return <FormSkeleton />;
  if (isError || !registrarConfig)
    return <FormError errorMessage="failed to load registrar config" />;
  return <RegistrarOwnerContext {...registrarConfig} />;
}

function RegistrarOwnerContext(props: RegistrarConfig) {
  const methods = useForm<RegistrarOwnerValues>({
    resolver: yupResolver(updateOwnerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { initialOwner: props.owner },
  });

  return (
    <FormProvider {...methods}>
      <OwnerUpdateForm />
    </FormProvider>
  );
}
