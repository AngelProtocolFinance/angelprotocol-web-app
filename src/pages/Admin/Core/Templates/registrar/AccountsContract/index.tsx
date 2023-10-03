import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import Form from "./Form";
import { schema } from "./schema";

export default function AccountsContract() {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { chainName: "", contractAddress: "" },
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
