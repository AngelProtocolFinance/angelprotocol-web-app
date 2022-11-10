import { yupResolver } from "@hookform/resolvers/yup";
import { ContactDetails } from "pages/Registration/types";
import { FormProvider, useForm } from "react-hook-form";
import { useRegistrationQuery } from "services/aws/registration";
import Form from "./Form";
import { schema } from "./schema";

export default function ContactDetails() {
  const { application } = useRegistrationQuery();

  const methods = useForm<ContactDetails>({
    resolver: yupResolver(schema),
    defaultValues: {
      organizationName: application.Registration.OrganizationName,
      firstName: application.ContactPerson.FirstName,
      lastName: application.ContactPerson.LastName,
      email: application.ContactPerson.Email,
      goals: application.ContactPerson.Goals,
      phone: application.ContactPerson.PhoneNumber,
      referralMethod: application.ContactPerson.ReferralMethod,
      otherReferralMethod: application.ContactPerson.OtherReferralMethod,
      role: application.ContactPerson.Role,
      otherRole: application.ContactPerson.OtherRole,
      checkedPolicy: false,
      uniqueID: application.ContactPerson.PK,
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
