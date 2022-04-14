import { yupResolver } from "@hookform/resolvers/yup";
import { ForwardedRef, forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { User } from "pages/Registration/store";
import Checkbox, { CheckboxProps } from "components/Checkbox";
import FormInput from "components/FormInput";
import { app, site, web } from "constants/routes";
import { Button } from "../../common";
import { userRoleOptions } from "../../constants";
import routes from "../../routes";
import RoleSelector from "./RoleSelector";
import { ContactDetails, ContactInfoSchema } from "./types";
import useSaveContactDetails from "./useContactDetails";

export default function ContactDetailsForm({ user }: { user: User }) {
  // 'orgRole' in the form changes automatically, but we need this state setter
  // just to cause a re-render when the role selection changes, mainly because
  // we need the "Other role" field rendering when role "other" is selected
  const [, setOrgRole] = useState("");
  const { error: isError, saveContactDetails } = useSaveContactDetails();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<ContactDetails>({
    resolver: yupResolver(ContactInfoSchema),
    defaultValues: {
      charityName: user.Registration.CharityName || "",
      firstName: user.ContactPerson.FirstName || "",
      lastName: user.ContactPerson.LastName || "",
      email: user.ContactPerson.Email || "",
      phone: user.ContactPerson.PhoneNumber || "",
      orgRole: user.ContactPerson.Role || "ceo",
      otherRole: user.ContactPerson.OtherRole || "",
      checkedPolicy: false,
      uniqueID: user.ContactPerson.PK || "",
    },
  });

  return (
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
          name="orgRole"
          options={userRoleOptions}
          control={control}
          onChange={(value: string) => setOrgRole(value)}
          otherRoleErrorMessage={errors.otherRole?.message}
          register={register}
          disabled={isSubmitting}
        />
      </div>
      <PrivacyPolicyCheckbox
        disabled={isSubmitting}
        {...register("checkedPolicy")}
        error={errors.checkedPolicy?.message}
        centerError
      />
      <div className="flex justify-center">
        {(user.ContactPerson.EmailVerified || isError) && (
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
  );
}

const PrivacyPolicyCheckbox = forwardRef(
  (props: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) => (
    <Checkbox {...props} ref={ref}>
      By checking this box, you declare that you have read and agreed to our{" "}
      <Link
        to={`${site.home}${web.privacy}`}
        target="_blank"
        rel="noreferrer noopener"
        className="underline text-angel-blue"
      >
        Privacy Policy
      </Link>
      <span className="text-failed-red ml-0.5">*</span>
    </Checkbox>
  )
);
