import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FundDestroyValues } from "pages/Admin/types";
import Form from "./Form";
import { schema } from "./schema";

export default function RemoveFund() {
  const methods = useForm<FundDestroyValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      fundId: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
