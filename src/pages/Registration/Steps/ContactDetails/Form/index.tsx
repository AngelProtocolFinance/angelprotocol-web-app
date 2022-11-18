import { FormValues as FV } from "../types";
import { BtnPrim } from "components/registration";
import FormInput from "../../../common/FormInput";
import ReferralSelector from "./ReferralSelector";
import RoleSelector from "./RoleSelector";
import useSaveContactDetails from "./useSubmit";

export default function Form() {
  const { submit, isSubmitting } = useSaveContactDetails();
  return (
    <form className="grid grid-cols-2 gap-6" onSubmit={submit}>
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

      <FormInput<FV>
        classes="col-span-full"
        fieldName="goals"
        label="Goals"
        placeholder="What is your goal in working with Angel Protocol?"
        required
      />

      <BtnPrim
        type="submit"
        disabled={isSubmitting}
        className="col-span-full justify-self-center"
      >
        Continue
      </BtnPrim>
    </form>
  );
}
