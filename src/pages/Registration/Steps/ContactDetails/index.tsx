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
          PK: init.reference,
          Role: toRoleOption(contact.Role),
          ReferralMethod: toReferralOption(
            contact.ReferralMethod === "angel-alliance"
              ? "better-giving-alliance"
              : contact.ReferralMethod
          ),
          OrganizationName: contact.orgName,
        }
      : {
          PK: init.reference,
          Email: init.email,
          Role: { value: "", label: roles[""] },
          ReferralMethod: {
            value: "",
            label: referralMethods[""],
          },
          FirstName: firstName,
          LastName: lastName,
          OrganizationName: init.claim?.name,
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
