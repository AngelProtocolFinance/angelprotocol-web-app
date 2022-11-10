import { ForwardedRef, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { ContactDetails as CD, ContactDetails } from "pages/Registration/types";
import FormInput from "pages/Registration/common/FormInput";
import Checkbox, { CheckboxProps } from "components/Checkbox";
import { PRIVACY_POLICY } from "constants/urls";
import { Button } from "../../../common";
import ReferralSelector from "./ReferralSelector";
import RoleSelector from "./RoleSelector";
import useSaveContactDetails from "./useContactDetails";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<ContactDetails>();

  const { saveContactDetails } = useSaveContactDetails();

  return (
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
      <PrivacyPolicyCheckbox
        disabled={isSubmitting}
        {...register("checkedPolicy")}
        error={errors.checkedPolicy?.message}
        centerError
      />

      <Button submit className="btn-orange w-48 h-12" isLoading={isSubmitting}>
        Continue
      </Button>
    </form>
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
        className="underline text-blue"
      >
        Privacy Policy
      </a>
      <span className="text-red ml-0.5">*</span>
    </Checkbox>
  )
);
