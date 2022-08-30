import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FundDestroyValues } from "pages/Admin/types";
import FundDestroyerForm from "./Form";
import { fundDestroyerSchema } from "./schema";

export default function RemoveFund() {
  const methods = useForm<FundDestroyValues>({
    resolver: yupResolver(fundDestroyerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      fundId: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <FundDestroyerForm />
    </FormProvider>
  );
}
