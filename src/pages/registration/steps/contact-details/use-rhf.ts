import type { IReg } from "@better-giving/reg";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useController, useForm } from "react-hook-form";
import { type FV, schema } from "./schema";

export function use_rhf(reg: IReg) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, dirtyFields },
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    defaultValues: {
      r_first_name: reg.r_first_name,
      r_last_name: reg.r_last_name,
      r_contact_number: reg.r_contact_number,
      r_org_role: reg.r_org_role,
      r_org_role_other: reg.r_org_role === "other" ? reg.r_org_role : "",
      rm: reg.rm,
      rm_other: reg.rm === "other" ? reg.rm : "",
      rm_referral_code: reg.rm === "referral" ? reg.rm_referral_code : "",
      o_name: reg.o_name,
    },
  });

  const { field: rm } = useController({
    control,
    name: "rm",
  });
  const { field: org_role } = useController({ control, name: "r_org_role" });

  return {
    register,
    handleSubmit,
    errors,
    isDirty,
    isSubmitting,
    dirtyFields,
    //controllers
    org_role,
    rm,
  };
}
