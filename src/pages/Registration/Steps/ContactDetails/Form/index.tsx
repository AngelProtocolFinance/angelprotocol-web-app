import LoadText from "components/LoadText";
import { Selector } from "components/Selector";
import { Field, Label } from "components/form";
import { APP_NAME } from "constants/env";
import { ContactRoles, ReferralMethods } from "types/aws";
import { referralOptions, roleOptions } from "../constants";
import { FormValues as FV } from "../types";
import useSubmit from "./useSubmit";

export default function Form({ classes = "" }: { classes?: string }) {
  const { submit, isSubmitting } = useSubmit();
  return (
    <form
      className={`w-full bg-white dark:bg-blue-d6 ${classes}`}
      onSubmit={submit}
    >
      <h2 className="text-center sm:text-left text-xl mb-2">
        Let's start with your contact details
      </h2>
      <p className="text-center sm:text-left text-lg mb-8">
        Thank you for sharing! This information will be kept private and will
        let us know more about you and your organization
      </p>
      <h3 className="mb-4">Personal information</h3>
      <Field<FV>
        name="FirstName"
        label="First name"
        placeholder="e.g. John"
        required
        classes={{ container: "mb-4" }}
      />
      <Field<FV>
        name="LastName"
        label="Last name"
        placeholder="e.g. Doe"
        required
        classes={{ container: "mb-4" }}
      />
      <Field<FV>
        name="PhoneNumber"
        label="Phone number"
        placeholder="000000000"
        required={false}
        classes={{ container: "mb-4" }}
      />
      <Field<FV> name="Email" label="E-mail address" required disabled />
      <h3 className="mt-8 mb-4">Organization information</h3>
      <Field<FV>
        name="OrganizationName"
        label="Name of your organization"
        placeholder="Organization name"
        classes={{ container: "mb-4" }}
        required
      />
      <Label required className="mb-2">
        What's your role within the organization?
      </Label>
      <Selector<FV, "Role", ContactRoles> name="Role" options={roleOptions}>
        {({ value }) =>
          value === "other" && (
            <Field<FV>
              name="OtherRole"
              label="Specify your role"
              required
              classes={{ container: "mt-4" }}
            />
          )
        }
      </Selector>

      <h3 className="mt-8 mb-4">Other information</h3>
      <Label required className="mb-2">
        How did you find about us?
      </Label>
      <Selector<FV, "ReferralMethod", ReferralMethods>
        name="ReferralMethod"
        options={referralOptions}
      >
        {({ value }) => (
          <>
            {value === "other" && (
              <Field<FV>
                name="OtherReferralMethod"
                label="Please provide additional information"
                required
                classes={{ container: "mt-4" }}
              />
            )}
            {value === "referral" && (
              <Field<FV>
                name="ReferralCode"
                label="Referral Code"
                required
                classes={{ container: "mt-4" }}
              />
            )}
          </>
        )}
      </Selector>
      <Field<FV>
        name="Goals"
        label="Goals"
        placeholder={`What is your goal working with ${APP_NAME}?`}
        classes={{ container: "mt-4" }}
        required
      />
      <button
        type="submit"
        className="mt-8 py-3 px-8 w-full sm:w-auto btn-orange btn-reg"
        disabled={isSubmitting}
      >
        <LoadText isLoading={isSubmitting}>Continue</LoadText>
      </button>
    </form>
  );
}
