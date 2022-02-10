import { yupResolver } from "@hookform/resolvers/yup";
import Action from "components/ActionButton/Action";
import { userRoleOptions, UserRoles } from "constants/userRoles";
import { PropsWithChildren, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { registration } from "types/routes";
import PrivacyPolicyCheckbox from "./PrivacyPolicyCheckbox";
import FormInput from "../FormInput";
import RoleSelector from "./RoleSelector";
import useSaveContactDetails from "./useContactDetails";
import { ContactDetails, ContactInfoSchema } from "./types";

export default function ContactDetailsForm(props: any) {
  // 'orgRole' in the form changes automatically, but we need this state setter
  // just to cause a re-render when the role selection changes, mainly because
  // we need the "Other role" field rendering when role "other" is selected
  const [, setOrgRole] = useState("");
  const saveContactDetails = useSaveContactDetails();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<ContactDetails>({
    resolver: yupResolver(ContactInfoSchema),
    defaultValues: {
      charityName: props.contactData?.CharityName || "",
      firstName: props.contactData?.FirstName || "",
      lastName: props.contactData?.LastName || "",
      email: props.contactData?.Email || "",
      phone: props.contactData?.PhoneNumber || "",
      orgRole: props.contactData?.Role || UserRoles.ceo,
      otherRole: props.contactData?.otherRole || "",
      checkedPolicy: false,
      uniqueID: props.contactData?.PK || "",
    },
  });

  const handleRoleChange = useCallback(
    (value: string) => setOrgRole(value),
    []
  );

  return (
    <form
      className="mx-auto md:w-full flex flex-col gap-6"
      onSubmit={handleSubmit(saveContactDetails)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ColumnContainer>
          <FormInput
            label="Name of your organization"
            placeholder="Organization"
            registerReturn={register("charityName")}
            errorMessage={errors.charityName?.message}
            required
            disabled={isSubmitting}
          />
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
        </ColumnContainer>
        <ColumnContainer>
          <FormInput
            label="Phone number"
            placeholder="Phone number"
            registerReturn={register("phone")}
            disabled={isSubmitting}
          />
          <RoleSelector
            label="What's your role within the organization?"
            name="orgRole"
            options={userRoleOptions}
            control={control}
            onChange={handleRoleChange}
            otherRoleErrorMessage={errors.otherRole?.message}
            register={register}
            disabled={isSubmitting}
          />
        </ColumnContainer>
      </div>
      <PrivacyPolicyCheckbox
        error={errors.checkedPolicy?.message}
        registerReturn={register("checkedPolicy")}
        disabled={isSubmitting}
      />
      <div className="flex justify-center">
        {props.contactData?.PK && (
          <Action
            title="Back"
            classes="bg-green-400 w-48 h-12 mr-2"
            disabled={isSubmitting}
            onClick={() => history.push(registration.status)}
          />
        )}
        <Action
          submit
          title="Continue"
          classes="bg-thin-blue w-48 h-12"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
}

function ColumnContainer({ children }: PropsWithChildren<{}>) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
