import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { ContactRoles, ReferralMethods } from "types/aws";
import { OptionType } from "types/components";
import { useRegState, withStepGuard } from "../StepGuard";
import Form from "./Form";
import { referralMethods, roles } from "./constants";
import { schema } from "./schema";

function ContactDetails() {
  const {
    data: { contact, init },
  } = useRegState<1>();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: contact
      ? {
          ...contact,
          PK: init.reference,
          Role: toRoleOption(contact.Role),
          ReferralMethod: toReferralOption(contact.ReferralMethod),
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
