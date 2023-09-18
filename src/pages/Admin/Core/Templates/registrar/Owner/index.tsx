import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { useContractQuery } from "services/juno";
import QueryLoader from "components/QueryLoader";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function Owner() {
  const query = useContractQuery("registrar.owner", {});

  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: <FormSkeleton />,
        error: <FormError errorMessage="failed to load registrar config" />,
      }}
    >
      {(owner) => <RegistrarOwnerContext prevOwner={owner} />}
    </QueryLoader>
  );
}

function RegistrarOwnerContext(props: { prevOwner: string }) {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { initialOwner: props.prevOwner },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
