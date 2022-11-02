import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FormValues as FV, Props } from "../types";
import CountrySelector from "components/CountrySelector";
import {
  Label,
  TextInput,
  errorStyle,
  textFieldStyle,
} from "components/TextInput";
import { BtnPrimary } from "components/donation";
import Controls from "./Controls";
import Terms from "./Terms";
import Tooltip from "./Tooltip";
import useSubmit from "./useSubmit";

export const formStyle =
  "w-full bg-gray-l5 dark:bg-blue-d4 text-gray-d2 dark:text-white font-work";

export default function Form({ classes = "", ...props }: Props) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<FV>();
  const submit = useSubmit(props);
  const isPostKyc = props.type === "post-donation";

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
        <div className="form-control rounded-md grid">
          <CountrySelector
            placeholder="United Kingdom"
            fieldName="country"
            classes={{
              input: textFieldStyle,
            }}
          />
          <ErrorMessage
            errors={errors}
            name="country"
            as="span"
            className={errorStyle}
          />
        </div>
      </div>
      <TextInput<FV>
        name="state"
        label="State"
        required={false}
        placeholder="e.g. England"
      />
      <TextInput<FV>
        name="email"
        label="Email address"
        placeholder="e.g. johndoe@mail.com"
        classes={{ container: "col-span-full" }}
      />
      <Terms classes={`${isPostKyc ? "my-2" : "my-12"} col-span-full`} />
      {props.type === "post-donation" ? (
        <BtnPrimary
          as="btn"
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
