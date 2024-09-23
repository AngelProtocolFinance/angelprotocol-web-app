import type { ReferralMethod, Role } from "@better-giving/registration/models";
import LoadText from "components/LoadText";
import { Selector } from "components/Selector";
import { Field, Label } from "components/form";
import { APP_NAME } from "constants/env";
import { referralOptions, roleOptions } from "../constants";
import type { FormValues as FV } from "../types";
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
        name="first_name"
        label="First name"
        placeholder="e.g. John"
        required
        classes={{ container: "mb-4" }}
      />
      <Field<FV>
        name="last_name"
        label="Last name"
        placeholder="e.g. Doe"
        required
        classes={{ container: "mb-4" }}
      />
      <Field<FV>
        name="contact_number"
        label="Phone number"
        placeholder="000000000"
        required={false}
        classes={{ container: "mb-4" }}
      />
      <Field<FV>
        name="registrant_id"
        label="E-mail address"
        required
        disabled
      />
      <h3 className="mt-8 mb-4">Organization information</h3>
      <Field<FV>
        name="org_name"
        label="Name of your organization"
        placeholder="Organization name"
        classes={{ container: "mb-4" }}
        required
      />
      <Label required className="mb-2">
        What's your role within the organization?
      </Label>
      <Selector<FV, "org_role", Role>
        name="org_role"
        options={roleOptions}
        classes={{ options: "text-sm" }}
      >
        {({ value }) =>
          value === "other" && (
            <Field<FV>
              name="other_role"
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
      <Selector<FV, "referral_method", ReferralMethod>
        name="referral_method"
        options={referralOptions}
        classes={{ options: "text-sm" }}
      >
        {({ value }) => (
          <>
            {value === "other" && (
              <Field<FV>
                name="other_referral_method"
                label="Please provide additional information"
                required
                classes={{ container: "mt-4" }}
              />
            )}
            {value === "referral" && (
              <Field<FV>
                name="referral_code"
                label="Referral Code"
                required
                classes={{ container: "mt-4" }}
              />
            )}
          </>
        )}
      </Selector>
      <Field<FV>
        name="goals"
        label="Goals"
        placeholder={`What is your goal working with ${APP_NAME}?`}
        classes={{ container: "mt-4" }}
        required
      />
      <button
        type="submit"
        className="mt-8 py-3 px-8 w-full sm:w-auto btn-blue btn-reg"
        disabled={isSubmitting}
      >
        <LoadText isLoading={isSubmitting}>Continue</LoadText>
      </button>
    </form>
  );
}
