import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import EndowmentUpdateForm from "./EndowmentUpdateForm";
import {
  EndowmentUpdateValues,
  endowmentUpdateSchema,
} from "./endowmentUpdateSchema";

export default function EndowmentUpdator() {
  const methods = useForm<EndowmentUpdateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(endowmentUpdateSchema),
    defaultValues: {
      endowmentAddr: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <EndowmentUpdateForm />
    </FormProvider>
  );
}
