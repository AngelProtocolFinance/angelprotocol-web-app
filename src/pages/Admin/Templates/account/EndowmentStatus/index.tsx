import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { EndowmentUpdateValues } from "pages/Admin/types";
import Form from "./Form";
import { schema } from "./schema";

export default function EndowmentUpdator() {
  const methods = useForm<EndowmentUpdateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      status: "1",
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
