import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "../types";
import { Button } from "../../../common";
import FormInput from "../../../common/FormInput";
import ReferralSelector from "./ReferralSelector";
import RoleSelector from "./RoleSelector";
import useSaveContactDetails from "./useContactDetails";

export default function Form() {
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useFormContext<FV>();

  const { saveContactDetails } = useSaveContactDetails();

  return (
    <form
      className="mx-auto md:w-full flex flex-col gap-6 padded-container"
      onSubmit={handleSubmit(saveContactDetails)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput<FV>
          fieldName="firstName"
          label="First name"
          placeholder="First name"
          required
        />
        <FormInput<FV>
          fieldName="lastName"
          label="Last name"
          placeholder="Last name"
          required
        />
        <FormInput<FV>
          fieldName="email"
          type="email"
          label="E-mail address"
          placeholder="E-mail address"
          disabled
          required
        />
        <FormInput<FV>
          fieldName="phone"
          label="Phone number"
          placeholder="Phone number"
        />
        <FormInput<FV>
          fieldName="orgName"
          label="Name of your organization"
          placeholder="Organization"
          required
        />
        <RoleSelector />
        <ReferralSelector />
      </div>
      <FormInput<FV>
        fieldName="goals"
        label="Goals"
        placeholder="What is your goal in working with Angel Protocol?"
        required
      />

      <Button submit className="btn-orange w-48 h-12" isLoading={isSubmitting}>
        Continue
      </Button>
    </form>
  );
}
