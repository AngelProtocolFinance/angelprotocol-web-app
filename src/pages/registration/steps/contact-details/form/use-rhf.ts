import { valibotResolver } from "@hookform/resolvers/valibot";
import type { Step1Data } from "pages/registration/types";
import { useController, useForm } from "react-hook-form";
import type { UserV2 } from "types/auth";
import { type FV, schema } from "./schema";

export function useRhf(data: Step1Data, user: UserV2) {
  const { contact, init } = data;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    defaultValues: contact
      ? {
          ...contact,
          registrant_id: init.registrant_id,
          referral_method:
            contact.referral_method === "better-giving-alliance"
              ? "better-giving-alliance"
              : contact.referral_method,
          referral_code: contact.referral_code,
        }
      : {
          registrant_id: init.registrant_id,
          org_role: "",
          referral_method: init.referrer ? "referral" : "",
          first_name: user.firstName ?? "",
          last_name: user.lastName ?? "",
          org_name: init.claim?.name ?? "",
          ...(init.referrer && { referral_code: init.referrer }),
        },
  });

  const { field: refMethod } = useController({
    control,
    name: "referral_method",
  });
  const { field: orgRole } = useController({ control, name: "org_role" });

  return {
    register,
    handleSubmit,
    errors,
    isDirty,
    isSubmitting,

    //controllers
    orgRole,
    refMethod,
  };
}
