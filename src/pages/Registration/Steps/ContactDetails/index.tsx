import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthenticatedUser } from "contexts/Auth";
import { FormProvider, useForm } from "react-hook-form";
import type { ContactRoles, ReferralMethods } from "types/aws";
import type { OptionType } from "types/components";
import { useRegState, withStepGuard } from "../StepGuard";
import Form from "./Form";
import { referralMethods, roles } from "./constants";
import { schema } from "./schema";
import type { FormValues } from "./types";

function ContactDetails() {
  const {
    data: { contact, init },
  } = useRegState<1>();

  const { firstName = "", lastName = "" } = useAuthenticatedUser();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: contact
      ? {
          ...contact,
          id: init.id,
          registrant_id: init.registrant_id,
          org_role: toRoleOption(contact.org_role),
          referral_method: toReferralOption(
            contact.referral_method === "better-giving-alliance"
              ? "better-giving-alliance"
              : contact.referral_method
          ),
        }
      : {
          id: init.id,
          registrant_id: init.registrant_id,
          org_role: { value: "", label: roles[""] },
          referral_method: {
            value: "",
            label: referralMethods[""],
          },
          first_name: firstName,
          last_name: lastName,
          org_name: init.claim?.name ?? "",
          goals: "",
        },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

export default withStepGuard(ContactDetails);

function toRoleOption(value: ContactRoles): OptionType<ContactRoles> {
  return { value, label: roles[value] };
}

function toReferralOption(value: ReferralMethods): OptionType<ReferralMethods> {
  return { value, label: referralMethods[value] };
}
