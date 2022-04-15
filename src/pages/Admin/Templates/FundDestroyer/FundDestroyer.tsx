import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import FundDestroyerForm from "./FundDestroyerForm";
import { FundDestroyValues, fundDestroyerSchema } from "./fundDestroyerSchema";

export default function FundDestroyer() {
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
