import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FundUpdateValues } from "pages/Admin/types";
import FundUpdatorForm from "./Form";
import { schema } from "./schema";

export default function Members() {
  const methods = useForm<FundUpdateValues>({
    resolver: yupResolver(schema),
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
