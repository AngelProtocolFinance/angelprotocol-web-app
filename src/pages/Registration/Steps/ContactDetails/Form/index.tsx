import { FormValues as FV } from "../types";
import { ContactRoles, ReferralMethods } from "types/aws";
import { SelectorFormField } from "components/SelectorFormField";
import { Label } from "components/form";
import { BtnPrim, LoadText, TextInput } from "components/registration";
import { referralOptions, roleOptions } from "../constants";
import useSubmit from "./useSubmit";

export default function Form({ classes = "" }: { classes?: string }) {
  const { submit, isSubmitting } = useSubmit();
  return (
    <form
      className={`w-full bg-white dark:bg-blue-d6 ${classes}`}
      onSubmit={submit}
    >
      <h2 className="font-bold text-center sm:text-left text-xl mb-2">
        Let's start with your contact details
      </h2>
      <p className="text-center sm:text-left text-lg mb-8">
        This information will let us know more about your organization and who
        you are. Once this form is submitted, you will be able to resume your
        registration if it gets interrupted in the future.
      </p>
      <h3 className="font-bold mb-4">Personal information</h3>
      <TextInput<FV>
        name="firstName"
        label="First name"
        placeholder="e.g. John"
        required
        classes={{ container: "mb-4" }}
      />
      <TextInput<FV>
        name="lastName"
        label="Last name"
        placeholder="e.g. Doe"
        required
        classes={{ container: "mb-4" }}
      />
      <TextInput<FV>
        name="phone"
        label="Phone number"
        placeholder="000000000"
        required={false}
        classes={{ container: "mb-4" }}
      />
      <TextInput<FV> name="email" label="E-mail address" required disabled />
      <h3 className="font-bold mt-8 mb-4">Organization information</h3>
      <TextInput<FV>
        name="orgName"
        label="Name of your organization"
        placeholder="Organization name"
        classes={{ container: "mb-4" }}
        required
      />
      <Label required className="mb-2">
        What's your role within the organization?
      </Label>
      <SelectorFormField<FV, "role", ContactRoles, false>
        name="role"
        options={roleOptions}
      >
        {({ value }) =>
          value === "other" && (
            <TextInput<FV>
              name="otherRole"
              label="Specify your role"
              required
              classes={{ container: "mt-4" }}
            />
          )
        }
      </SelectorFormField>

      <h3 className="font-bold mt-8 mb-4">Other information</h3>
      <Label required className="mb-2">
        How did you find about us?
      </Label>
      <SelectorFormField<any, any, ReferralMethods, false>
        name="referralMethod"
        options={referralOptions}
      >
        {({ value }) =>
          value === "other" && (
            <TextInput<FV>
              name="otherReferralMethod"
              label="Other referral method"
              required
              classes={{ container: "mt-4" }}
            />
          )
        }
      </SelectorFormField>
      <TextInput
        name="goals"
        label="Goals"
        placeholder="What is your goal working with Angel Protocol?"
        classes={{ container: "mt-4" }}
        required
      />
      <BtnPrim
        type="submit"
        className="mt-8 py-3 px-8 w-full sm:w-auto"
        disabled={isSubmitting}
      >
        <LoadText isLoading={isSubmitting}>Continue</LoadText>
      </BtnPrim>
    </form>
  );
}
