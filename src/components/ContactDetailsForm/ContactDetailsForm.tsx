import { yupResolver } from "@hookform/resolvers/yup";
import Action from "components/ActionButton/Action";
import { userRoles } from "constants/userRoles";
import { PropsWithChildren, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { registration } from "types/routes";
import PrivacyPolicyCheckbox from "./PrivacyPolicyCheckbox";
import Input from "./Input";
import RoleSelector from "./RoleSelector";
import { useContactDetails } from "./useContactDetails";
import { ContactDetails, ContactInfoSchema } from "./types";

export default function ContactDetailsForm(props: any) {
  const [isLoading, setIsLoading] = useState(false);
  // 'orgRole' in the form changes automatically, but we need this state setter
  // just to cause a re-render when the role selection changes, mainly because
  // we need the "Other role" field rendering when role "other" is selected
  const [, setOrgRole] = useState("");
  const { saveContactInfo } = useContactDetails();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ContactDetails>({
    resolver: yupResolver(ContactInfoSchema),
    defaultValues: {
      charityName: props.contactData?.CharityName || "",
      firstName: props.contactData?.FirstName || "",
      lastName: props.contactData?.LastName || "",
      email: props.contactData?.Email || "",
      phone: props.contactData?.PhoneNumber || "",
      orgRole: props.contactData?.Role || "ceo",
      otherRole: props.contactData?.otherRole || "",
      checkedPolicy: false,
      uniqueID: props.contactData?.PK || "",
    },
  });

  const onSumbitContactDetails = useCallback(
    async (values: ContactDetails) => {
      setIsLoading(true);
      await saveContactInfo(values);
      setIsLoading(false);
    },
    [saveContactInfo]
  );

  const handleRoleChange = useCallback(
    (value: string) => setOrgRole(value),
    []
  );

  return (
    <div className="flex items-center justify-center">
      <form
        className="md:w-4/5 text-left"
        onSubmit={handleSubmit(onSumbitContactDetails)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColumnContainer>
            <Input
              label="Name of your organization"
              placeholder="Organization"
              registerReturn={register("charityName")}
              errorMessage={errors.charityName?.message}
              required
            />
            <Input
              label="First name"
              placeholder="First name"
              registerReturn={register("firstName")}
              errorMessage={errors.firstName?.message}
              required
            />
            <Input
              label="Last name"
              placeholder="Last name"
              registerReturn={register("lastName")}
              errorMessage={errors.lastName?.message}
              required
            />
            <Input
              type="email"
              label="E-mail address"
              placeholder="E-mail address"
              registerReturn={register("email")}
              errorMessage={errors.email?.message}
              required
            />
          </ColumnContainer>
          <ColumnContainer>
            <Input
              label="Phone number"
              placeholder="Phone number"
              registerReturn={register("phone")}
            />
            <RoleSelector
              label="What's your role within the organization?"
              name="orgRole"
              options={userRoles}
              control={control}
              onChange={handleRoleChange}
              otherRoleErrorMessage={errors.otherRole?.message}
              register={register}
            />
          </ColumnContainer>
        </div>
        <PrivacyPolicyCheckbox
          error={errors.checkedPolicy?.message}
          registerReturn={register("checkedPolicy")}
        />
        <div className="flex justify-center">
          {props.contactData?.PK && (
            <Action
              title="Back"
              classes="bg-green-400 w-48 h-12 mr-2"
              disabled={isLoading}
              onClick={() => history.push(registration.status)}
            />
          )}
          <Action
            submit
            title="Continue"
            classes="bg-thin-blue w-48 h-12"
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
}

function ColumnContainer({ children }: PropsWithChildren<{}>) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
