import { FormValues as FV } from "../types";
import { BtnPrim } from "components/registration";
import FormInput from "../../../common/FormInput";
import ReferralSelector from "./ReferralSelector";
import RoleSelector from "./RoleSelector";
import useSaveContactDetails from "./useSubmit";

export default function Form() {
  const { submit, isSubmitting } = useSaveContactDetails();
  return (
    <form
      className="mx-auto md:w-full flex flex-col gap-6 padded-container"
      onSubmit={submit}
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

      <BtnPrim type="submit" disabled={isSubmitting}>
        Continue
      </BtnPrim>
    </form>
  );
}
