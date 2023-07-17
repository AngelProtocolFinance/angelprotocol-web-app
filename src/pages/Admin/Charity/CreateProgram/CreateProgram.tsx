import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { FV } from "./types";
import { Program } from "types/aws";
import { isTooltip, useAdminContext } from "../../Context";
import Form from "./Form";
import { ops } from "./ops";
import { schema } from "./schema";

export default function CreateProgram() {
  const { state } = useLocation();

  const program = state as Program | undefined;

  const { txResource } = useAdminContext(ops);

  const defaults: FV = {
    title: program?.program_title ?? "",
    description: program?.program_description ?? "",
    image: {
      name: "",
      publicUrl: program?.program_banner ?? "",
      preview: program?.program_banner ?? "",
    },
    initial: program,
  };

  const methods = useForm<FV>({
    defaultValues: defaults,
    resolver: yupResolver(schema),
  });

  const tooltip = isTooltip(txResource) ? txResource : undefined;

  return (
    <FormProvider {...methods}>
      <Form tooltip={tooltip} />
    </FormProvider>
  );
}
