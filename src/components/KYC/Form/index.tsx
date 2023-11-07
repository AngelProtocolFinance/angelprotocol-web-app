import { useFormContext } from "react-hook-form";
import { FormValues as FV, Props } from "../types";
import countries from "assets/countries/all.json";
import CountrySelector from "components/CountrySelector";
import ExtLink from "components/ExtLink";
import { Selector } from "components/Selector";
import { Field, Label } from "components/form";
import { PRIVACY_POLICY, TERMS_OF_USE_DONOR } from "constants/urls";
import Controls from "./Controls";
import Tooltip from "./Tooltip";
import { states } from "./us-states";
import useSubmit from "./useSubmit";

export const formStyle = "w-full text-gray-d2 dark:text-white font-work p-3";

export default function Form({ classes = "", ...props }: Props) {
  const {
    watch,
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = useFormContext<FV>();
  const submit = useSubmit(props);
  const isPostKyc = props.type === "post-donation";

  const country = watch("country.name");
  const isUS = /united states/i.test(country);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`${classes} ${formStyle}`}
      autoComplete="off"
      autoSave="off"
    >
      <Tooltip
        {...props}
        classes={`${isPostKyc ? "" : "mb-12"} col-span-full`}
      />
      <Field<FV>
        classes="field-kyc"
        name="name.first"
        label="First name"
        placeholder="e.g. John"
      />
      <Field<FV>
        classes="field-kyc"
        name="name.last"
        label="Last name"
        placeholder="e.g. Doe"
      />
      <Field<FV>
        classes="field-kyc"
        name="address.street"
        label="Address"
        placeholder="e.g. Street Rd 9920"
      />
      <Field<FV>
        classes="field-kyc"
        name="address.complement"
        label="Address Line 2"
        placeholder="e.g. PO Box 1234"
        required={false}
      />
      <Field<FV>
        classes="field-kyc"
        name="city"
        label="City"
        placeholder="e.g. London"
      />
      <Field<FV>
        classes="field-kyc"
        name="postalCode"
        label="Zip code"
        placeholder="e.g. 1080"
      />
      <div className="grid relative">
        <Label htmlFor="country" className="mb-2">
          Country
        </Label>

        <CountrySelector<FV>
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
        name="email"
        label="Email address"
        placeholder="e.g. johndoe@mail.com"
        classes={{ container: "col-span-full field-kyc" }}
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
      {props.type === "post-donation" ? (
        <button
          className="col-span-full btn-orange text-sm"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Processing..." : "Submit"}
        </button>
      ) : (
        <Controls {...props} classes="col-span-full" />
      )}
    </form>
  );
}
