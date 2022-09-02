import { yupResolver } from "@hookform/resolvers/yup";
import { ForwardedRef, forwardRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ContactDetails as CD } from "pages/Registration/types";
import { Charity } from "types/aws";
import FormInput from "pages/Registration/common/FormInput";
import Checkbox, { CheckboxProps } from "components/Checkbox";
import { appRoutes } from "constants/routes";
import { PRIVACY_POLICY } from "constants/urls";
import { Button } from "../../common";
import routes from "../../routes";
import ReferralSelector from "./ReferralSelector";
import RoleSelector from "./RoleSelector";
import { ContactInfoSchema } from "./contactDetailsSchema";
import useSaveContactDetails from "./useContactDetails";

type Props = { charity: Charity };

export default function ContactDetailsForm({ charity }: Props) {
  const methods = useForm<CD>({
    resolver: yupResolver(ContactInfoSchema),
    defaultValues: {
      charityName: charity.Registration.CharityName,
      firstName: charity.ContactPerson.FirstName,
      lastName: charity.ContactPerson.LastName,
      email: charity.ContactPerson.Email,
      goals: charity.ContactPerson.Goals,
      phone: charity.ContactPerson.PhoneNumber,
      referralMethod: charity.ContactPerson.ReferralMethod,
      otherReferralMethod: charity.ContactPerson.OtherReferralMethod,
      role: charity.ContactPerson.Role,
      otherRole: charity.ContactPerson.OtherRole,
      checkedPolicy: false,
      uniqueID: charity.ContactPerson.PK,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
          <FormInput<CD>
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
          />
          <FormInput<CD>
            fieldName="email"
            type="email"
            label="E-mail address"
            placeholder="E-mail address"
            required
          />
          <FormInput<CD>
            fieldName="phone"
            label="Phone number"
            placeholder="Phone number"
          />
          <FormInput<CD>
            fieldName="charityName"
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
        <PrivacyPolicyCheckbox
          disabled={isSubmitting}
          {...register("checkedPolicy")}
          error={errors.checkedPolicy?.message}
          centerError
        />
        <div className="flex justify-center">
          {/* If JunoWallet field is set, we can assume ContactDetails update form has been navigated to from the Dashboard*/}
          {charity.Metadata.JunoWallet && (
            <Button
              className="bg-green-400 w-48 h-12 mr-2"
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
            className="bg-thin-blue w-48 h-12"
            isLoading={isSubmitting}
          >
            Continue
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

const PrivacyPolicyCheckbox = forwardRef(
  (props: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) => (
    <Checkbox {...props} ref={ref}>
      By checking this box, you declare that you have read and agreed to our{" "}
      <a
        href={PRIVACY_POLICY}
        target="_blank"
        rel="noreferrer noopener"
        className="underline text-angel-blue"
      >
        Privacy Policy
      </a>
      <span className="text-failed-red ml-0.5">*</span>
    </Checkbox>
  )
);
