import type { IReg } from "@better-giving/reg";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { type DefaultValues, useController, useForm } from "react-hook-form";
import { type FV, schema } from "./schema";

export function use_rhf(reg: IReg) {
  const def: DefaultValues<FV> = {
    r_first_name: reg.r_first_name,
    r_last_name: reg.r_last_name,
    r_contact_number: reg.r_contact_number,
    r_org_role: reg.r_org_role,
    rm: reg.rm,
    o_name: reg.o_name,
  };

  if (reg.r_org_role === "other") {
    def.r_org_role_other = reg.r_org_role_other;
  }
  if (reg.rm === "other") {
    def.rm_other = reg.rm_other;
  }
  if (reg.rm === "referral") {
    def.rm_referral_code = reg.rm_referral_code;
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, dirtyFields },
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    defaultValues: def,
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
