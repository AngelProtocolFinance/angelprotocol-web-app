import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ContactDetails as CD } from "pages/Registration/types";
import FormInput from "pages/Registration/common/FormInput";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import { Button } from "../../../common";
import routes from "../../../routes";
import { ContactInfoSchema } from "./contactDetailsSchema";
import useSaveContactDetails from "./useContactDetails";

export default function ContactDetailsForm() {
  const { application } = useRegistrationQuery();

  const methods = useForm<CD>({
    resolver: yupResolver(ContactInfoSchema),
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
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { saveContactDetails } = useSaveContactDetails();
  const navigate = useNavigate();

  return (
    <FormProvider {...methods}>
      <form
        className="mx-auto md:w-full flex flex-col gap-6"
        onSubmit={handleSubmit(saveContactDetails)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* <FormInput<CD>
            fieldName="firstName"
            label="First name"
            placeholder="First name"
            required
          />
          <FormInput<CD>
            fieldName="lastName"
            label="Last name"
            placeholder="Last name"
            required
          /> */}
          <FormInput<CD>
            fieldName="email"
            type="email"
            label="E-mail address"
            placeholder="E-mail address"
            required
          />
          {/* <FormInput<CD>
            fieldName="phone"
            label="Phone number"
            placeholder="Phone number"
          />
          <FormInput<CD>
            fieldName="organizationName"
            label="Name of your organization"
            placeholder="Organization"
            required
          />
          <RoleSelector />
          <ReferralSelector />
        </div>
        <FormInput<CD>
          fieldName="goals"
          label="Goals"
          placeholder="What is your goal in working with Angel Protocol?"
          required
        />
        <PrivacyPolicyCheckbox />
        <div className="flex justify-center">
          {/* If JunoWallet field is set, we can assume ContactDetails update form has been navigated to from the Dashboard*/}
          {application.Metadata.JunoWallet && (
            <Button
              className="btn-outline-blue w-48 h-12 mr-2"
              disabled={isSubmitting}
              onClick={() =>
                navigate(`${appRoutes.register}/${routes.dashboard}`)
              }
            >
              Back
            </Button>
          )}
          <Button
            submit
            className="btn-orange w-48 h-12"
            isLoading={isSubmitting}
          >
            Continue
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
