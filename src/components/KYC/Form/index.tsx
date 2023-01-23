import { useFormContext } from "react-hook-form";
import { FormValues as FV, Props } from "../types";
import Checkbox from "components/Checkbox";
import CountrySelector from "components/CountrySelector";
import ExtLink from "components/ExtLink";
import { Selector } from "components/Selector";
import { BtnPrimary } from "components/donation";
import { Label } from "components/form";
import { TERMS_OF_USE } from "constants/urls";
import Controls from "./Controls";
import TextInput, { errorStyle } from "./TextInput";
import Tooltip from "./Tooltip";
import { states } from "./us-states";
import useSubmit from "./useSubmit";

export const formStyle =
  "w-full bg-gray-l5 dark:bg-blue-d5 text-gray-d2 dark:text-white font-work";

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
      <TextInput<FV>
        name="name.first"
        label="First name"
        placeholder="e.g. John"
      />
      <TextInput<FV>
        name="name.last"
        label="Last name"
        placeholder="e.g. Doe"
      />
      <TextInput<FV>
        name="address.street"
        label="Address"
        placeholder="e.g. Street Rd 9920"
      />
      <TextInput<FV>
        name="address.complement"
        label="Address complement"
        placeholder="e.g. Street Rd 9920"
        required={false}
      />
      <TextInput<FV> name="city" label="City" placeholder="e.g. London" />
      <TextInput<FV>
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
            container:
              "px-4 border border-prim rounded focus-within:border-gray-d1 focus-within:dark:border-blue-l2 bg-gray-l5 dark:bg-blue-d6",
            input:
              "py-3.5 w-full placeholder:text-sm placeholder:text-gray-d1 dark:placeholder:text-gray focus:outline-none bg-transparent",
            error: errorStyle,
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
        <TextInput<FV>
          name="state"
          label="State"
          required={false}
          placeholder="e.g. England"
        />
      )}

      <TextInput<FV>
        name="email"
        label="Email address"
        placeholder="e.g. johndoe@mail.com"
        classes={{ container: "col-span-full" }}
      />
      <Checkbox<FV>
        name="hasAgreedToTerms"
        classes={{
          container: `${isPostKyc ? "my-2" : "my-12"} col-span-full`,
          checkbox:
            "appearance-none border relative border-gray-d2 dark:border-white rounded w-6 h-6 checked:before:content-['✓'] before:absolute-center before:text-xl focus:outline-none focus:ring-2 focus:ring-orange",
          error: "mt-2",
        }}
      >
        I have read and I agree with{" "}
        <ExtLink className="underline text-orange" href={TERMS_OF_USE}>
          Terms & Conditions
        </ExtLink>
        .
      </Checkbox>
      {props.type === "post-donation" ? (
        <BtnPrimary
          className="col-span-full"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Processing..." : "Submit"}
        </BtnPrimary>
      ) : (
        <Controls {...props} classes="col-span-full" />
      )}
    </form>
  );
}
