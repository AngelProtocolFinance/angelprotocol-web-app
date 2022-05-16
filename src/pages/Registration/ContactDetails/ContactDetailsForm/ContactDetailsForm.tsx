import { yupResolver } from "@hookform/resolvers/yup";
import { ForwardedRef, forwardRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Charity } from "services/aws/types";
import Checkbox, { CheckboxProps } from "components/Checkbox";
import FormInput from "components/FormInput";
import { app, site } from "constants/routes";
import { PRIVACY_POLICY } from "constants/urls";
import { Button } from "../../common";
import { contactRoleOptions, referralMethodOptions } from "../../constants";
import routes from "../../routes";
import GoalsInput from "./GoalsInput";
import ReferralSelector from "./ReferralSelector";
import RoleSelector from "./RoleSelector";
import { ContactDetails, ContactInfoSchema } from "./types";
import useSaveContactDetails from "./useContactDetails";

type Props = { charity: Charity };

export default function ContactDetailsForm({ charity }: Props) {
  // 'orgRole' in the form changes automatically, but we need this state setter
  // just to cause a re-render when the role selection changes, mainly because
  // we need the "Other role" field rendering when role "other" is selected
  const [, setOrgRole] = useState("");
  const [, setReferralMethod] = useState("");
  const { isError, saveContactDetails } = useSaveContactDetails();
  const navigate = useNavigate();

  const methods = useForm<ContactDetails>({
    resolver: yupResolver(ContactInfoSchema),
    defaultValues: {
      charityName: charity.Registration.CharityName,
      firstName: charity.ContactPerson.FirstName,
      lastName: charity.ContactPerson.LastName,
      email: charity.ContactPerson.Email,
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
    control,
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        className="mx-auto md:w-full flex flex-col gap-6"
        onSubmit={handleSubmit(saveContactDetails)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="First name"
            placeholder="First name"
            registerReturn={register("firstName")}
            errorMessage={errors.firstName?.message}
            required
            disabled={isSubmitting}
          />
          <FormInput
            label="Last name"
            placeholder="Last name"
            registerReturn={register("lastName")}
            errorMessage={errors.lastName?.message}
            required
            disabled={isSubmitting}
          />
          <FormInput
            type="email"
            label="E-mail address"
            placeholder="E-mail address"
            registerReturn={register("email")}
            errorMessage={errors.email?.message}
            required
            disabled={isSubmitting}
          />
          <FormInput
            label="Phone number"
            placeholder="Phone number"
            registerReturn={register("phone")}
            disabled={isSubmitting}
          />
          <FormInput
            label="Name of your organization"
            placeholder="Organization"
            registerReturn={register("charityName")}
            errorMessage={errors.charityName?.message}
            required
            disabled={isSubmitting}
          />
          <RoleSelector
            label="What's your role within the organization?"
            name="role"
            options={contactRoleOptions}
            control={control}
            onChange={(value: string) => setOrgRole(value)}
            otherRoleErrorMessage={errors.otherRole?.message}
            register={register}
            disabled={isSubmitting}
          />
          <ReferralSelector
            label="How did you find out about us?"
            name="referralMethod"
            options={referralMethodOptions}
            control={control}
            onChange={(value: string) => setReferralMethod(value)}
            otherReferralMethodErrorMessage={
              errors.otherReferralMethod?.message
            }
            register={register}
            disabled={isSubmitting}
          />
        </div>
        <GoalsInput />
        <PrivacyPolicyCheckbox
          disabled={isSubmitting}
          {...register("checkedPolicy")}
          error={errors.checkedPolicy?.message}
          centerError
        />
        <div className="flex justify-center">
          {(charity.ContactPerson.EmailVerified || isError) && (
            <Button
              className="bg-green-400 w-48 h-12 mr-2"
              disabled={isSubmitting}
              onClick={() =>
                navigate(`${site.app}/${app.register}/${routes.dashboard}`)
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
