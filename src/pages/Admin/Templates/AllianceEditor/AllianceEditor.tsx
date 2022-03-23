import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import AllianceEditForm from "./AllianceEditForm";
import { allianceEditSchema, AllianceEditValues } from "./alllianceEditSchema";

export default function AllianceEditor() {
  const methods = useForm<AllianceEditValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(allianceEditSchema),
  });

  return (
    <FormProvider {...methods}>
      <AllianceEditForm />
    </FormProvider>
  );
}
