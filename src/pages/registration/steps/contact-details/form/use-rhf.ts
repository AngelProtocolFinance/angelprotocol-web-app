import type { ReferralMethod, Role } from "@better-giving/registration/models";
import { valibotResolver } from "@hookform/resolvers/valibot";
import type { Step1Data } from "pages/registration/types";
import { useController, useForm } from "react-hook-form";
import type { UserV2 } from "types/auth";
import { referralMethods, roles } from "../constants";
import {
  type FV,
  type ReferralOption,
  type RoleOption,
  schema,
} from "./schema";

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
          org_role: toRoleOption(contact.org_role),
          referral_method: toReferralOption(
            contact.referral_method === "better-giving-alliance"
              ? "better-giving-alliance"
              : contact.referral_method
          ),
        }
      : {
          registrant_id: init.registrant_id,
          org_role: { value: "", label: roles[""] },
          referral_method: {
            value: "",
            label: referralMethods[""],
          },
          first_name: user.firstName ?? "",
          last_name: user.lastName ?? "",
          org_name: init.claim?.name ?? "",
          goals: "",
        },
  });

  const {
    field: {
      value: referralMethod,
      onChange: onReferralMethodChange,
      ref: referralMethodRef,
    },
  } = useController({
    control,
    name: "referral_method",
  });
  const {
    field: { value: orgRole, onChange: onOrgRoleChange, ref: orgRoleRef },
  } = useController({ control, name: "org_role" });

  return {
    register,
    handleSubmit,
    errors,
    isDirty,
    isSubmitting,

    //controllers
    orgRole,
    orgRoleRef,
    onOrgRoleChange,
    referralMethod,
    onReferralMethodChange,
    referralMethodRef,
  };
}

function toRoleOption(value: Role): RoleOption {
  return { value, label: roles[value] };
}

function toReferralOption(value: ReferralMethod): ReferralOption {
  return { value, label: referralMethods[value] };
}
