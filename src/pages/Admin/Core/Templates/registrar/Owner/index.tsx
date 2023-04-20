import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { RegistrarOwnerValues } from "pages/Admin/types";
import { RegistrarConfig } from "types/contracts";
import { useContractQuery } from "services/juno";
import QueryLoader from "components/QueryLoader";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function Owner() {
  const query = useContractQuery("registrar.config", {});

  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: <FormSkeleton />,
        error: <FormError errorMessage="failed to load registrar config" />,
      }}
    >
      {(config) => <RegistrarOwnerContext {...config} />}
    </QueryLoader>
  );
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
