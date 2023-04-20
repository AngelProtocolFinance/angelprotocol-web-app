import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { IndexFundConfig } from "types/contracts";
import { useContractQuery } from "services/juno";
import QueryLoader from "components/QueryLoader";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function IndexFundOwner() {
  const query = useContractQuery("index-fund.config", {});

  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: <FormSkeleton />,
        error: <FormError errorMessage="Failed to load index-fund config" />,
      }}
    >
      {(config) => <FormWithContext {...config} />}
    </QueryLoader>
  );
}

function FormWithContext(props: IndexFundConfig) {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { owner: props.owner, newOwner: "" },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
