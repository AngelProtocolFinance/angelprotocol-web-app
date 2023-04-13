import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { useLatestBlockQuery } from "services/juno";
import QueryLoader from "components/QueryLoader";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export const INIT_SPLIT = "-1";

export default function CreateFund() {
  const query = useLatestBlockQuery(null);
  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: <FormSkeleton />,
        error: <FormError errorMessage="Failed to get current block number" />,
      }}
    >
      {(height) => <FundContext height={height} />}
    </QueryLoader>
  );
}

function FundContext(props: { height: string }) {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      liqSplit: INIT_SPLIT,
      isRotating: false,
      expiry: {
        height: props.height,
        time: "",
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
