import { valibotResolver } from "@hookform/resolvers/valibot";
import { useController, useForm } from "react-hook-form";
import { type FV, type Props, schema } from "./types";

export const use_rhf = (props: Props) => {
  const init: FV = {
    proof_of_identity: props.r_proof_of_identity ?? "",
    registration_number: props.o_registration_number ?? "",
    proof_of_reg: props.o_proof_of_reg ?? "",
    legal_entity_type: props.o_legal_entity_type ?? "",
    project_description: props.o_project_description ?? "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    register,
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    defaultValues: init,
  });

  const { field: poi } = useController({ control, name: "proof_of_identity" });
  const { field: por } = useController({ control, name: "proof_of_reg" });

  return {
    register,
    handleSubmit,
    errors,
    isDirty,
    poi,
    por,
  };
};
