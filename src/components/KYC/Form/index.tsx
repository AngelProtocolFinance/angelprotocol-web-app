import { useFormContext } from "react-hook-form";
import { FormValues as FV, Props } from "../types";
import CountrySelector from "components/CountrySelector";
import ExtLink from "components/ExtLink";
import { Selector } from "components/Selector";
import { CheckField, Field, Label } from "components/form";
import { TERMS_OF_USE } from "constants/urls";
import Controls from "./Controls";
import Tooltip from "./Tooltip";
import { states } from "./us-states";
import useSubmit from "./useSubmit";

export const formStyle =
  "w-full bg-gray-l6 dark:bg-blue-d5 text-gray-d2 dark:text-white font-work";

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
        label="Address complement"
        placeholder="e.g. Street Rd 9920"
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

        <CountrySelector<FV, "country">
          placeholder="Select a country"
          fieldName="country"
          onReset={() => resetField("usState")}
          classes={{
            container: "px-4 bg-gray-l6 dark:bg-blue-d6",
            input: "py-3.5 placeholder:text-sm",
            error: "field-error",
          }}
        />
      </div>
      {isUS ? (
        <div className="grid relative">
          <Label htmlFor="usState" className="mb-2" required={false}>
            State
          </Label>
          <Selector<FV, "usState", string, false>
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
      <CheckField<FV>
        name="hasAgreedToTerms"
        classes={{
          container: `check-field-kyc ${
            isPostKyc ? "my-2" : "my-12"
          } col-span-full`,
          error: "mt-2",
        }}
      >
        I have read and I agree with{" "}
        <ExtLink className="underline text-orange" href={TERMS_OF_USE}>
          Terms & Conditions
        </ExtLink>
        .
      </CheckField>
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
