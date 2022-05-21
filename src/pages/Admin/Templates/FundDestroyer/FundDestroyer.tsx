import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FundDestroyValues } from "pages/Admin/types";
import FundDestroyerForm from "./FundDestroyerForm";
import { fundDestroyerSchema } from "./fundDestroyerSchema";

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
