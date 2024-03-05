import countries from "assets/countries/all.json";
import CountrySelector from "components/CountrySelector";
import ExtLink from "components/ExtLink";
import { Selector } from "components/Selector";
import { Field, Label } from "components/form";
import { PRIVACY_POLICY, TERMS_OF_USE_DONOR } from "constants/urls";
import { useFormContext } from "react-hook-form";
import { FormValues as FV, Props } from "../types";
import Tooltip from "./Tooltip";
import { states } from "./us-states";

export const formStyle = "w-full text-navy-d4 dark:text-white p-3";

export default function Form({ classes = "", ...props }: Props) {
  const {
    watch,
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = useFormContext<FV>();

  const country = watch("country.name");
  const isUS = /united states/i.test(country);

  return (
    <form
      onSubmit={handleSubmit(props.onSubmit)}
      className={`${classes} ${formStyle}`}
      autoComplete="off"
      autoSave="off"
    >
      <Tooltip {...props} classes="col-span-full" />
      <Field<FV>
        classes="field-kyc"
        name="name.first"
        label="First name"
        placeholder="e.g. John"
        required
      />
      <Field<FV>
        classes="field-kyc"
        name="name.last"
        label="Last name"
        placeholder="e.g. Doe"
        required
      />
      <Field<FV>
        classes="field-kyc"
        name="address.street"
        label="Address"
        placeholder="e.g. Street Rd 9920"
        required
      />
      <Field<FV>
        classes="field-kyc"
        name="address.complement"
        label="Address Line 2"
        placeholder="e.g. PO Box 1234"
      />
      <Field<FV>
        classes="field-kyc"
        name="city"
        label="City"
        placeholder="e.g. London"
        required
      />
      <Field<FV>
        classes="field-kyc"
        name="postalCode"
        label="Zip code"
        placeholder="e.g. 1080"
        required
      />
      <div className="grid relative">
        <Label htmlFor="country" className="mb-2" required>
          Country
        </Label>

        <CountrySelector<FV, "country">
          placeholder="Select a country"
          fieldName="country"
          countries={countries}
          onReset={() => resetField("usState")}
          classes={{
            container: "px-4 bg-gray-l6 dark:bg-blue-d6",
            input: "py-3 placeholder:text-sm",
            error: "field-error",
          }}
        />
      </div>
      {isUS ? (
        <div className="grid relative">
          <Label htmlFor="usState" className="mb-2" required={false}>
            State
          </Label>
          <Selector<FV, "usState", string>
            name="usState"
            options={states}
            classes={{ container: "bg-white dark:bg-blue-d6" }}
          />
        </div>
      ) : (
        <Field<FV>
          classes="field-kyc"
          name="state"
          label="State"
          required={false}
          placeholder="e.g. England"
        />
      )}

      <Field<FV>
        name="kycEmail"
        label="Email address"
        placeholder="e.g. johndoe@mail.com"
        classes={{ container: "col-span-full field-kyc" }}
        required
      />
      <p className="text-sm col-span-full">
        By submitting this information, you agree to our{" "}
        <ExtLink href={PRIVACY_POLICY} className="text-blue hover:text-blue-l2">
          Privacy Policy
        </ExtLink>{" "}
        and{" "}
        <ExtLink
          href={TERMS_OF_USE_DONOR}
          className="text-blue hover:text-blue-l2"
        >
          Terms of Use
        </ExtLink>
        .
      </p>

      <button
        className="col-span-full btn-orange text-sm"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Processing..." : "Submit"}
      </button>
    </form>
  );
}
