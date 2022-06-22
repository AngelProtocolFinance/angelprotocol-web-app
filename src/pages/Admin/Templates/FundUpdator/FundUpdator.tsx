import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FundUpdateValues } from "pages/Admin/types";
import FundUpdatorForm from "./FundUpdatorForm";
import { fundDestroyerSchema } from "./fundUpdatorSchema";

export default function FundUpdator() {
  const methods = useForm<FundUpdateValues>({
    resolver: yupResolver(fundDestroyerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      fundId: "",
    },
  });
  return (
    <FormProvider {...methods}>
      <FundUpdatorForm />
    </FormProvider>
  );
}
