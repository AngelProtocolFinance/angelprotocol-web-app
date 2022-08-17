import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { EndowmentUpdateValues } from "pages/Admin/types";
import EndowmentUpdateForm from "./EndowmentUpdateForm";
import { endowmentUpdateSchema } from "./endowmentUpdateSchema";

export default function EndowmentUpdator() {
  const methods = useForm<EndowmentUpdateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(endowmentUpdateSchema),
    defaultValues: {},
  });

  return (
    <FormProvider {...methods}>
      <EndowmentUpdateForm />
    </FormProvider>
  );
}
