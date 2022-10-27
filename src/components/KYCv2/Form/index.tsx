import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FormValues as FV, Props } from "../types";
import CountrySelector from "components/CountrySelector";
import Label from "../Label";
import { TextInput, textFieldStyle } from "../TextInput";
import useSubmit from "../useSubmit";
import Tooltip from "./Tooltip";

export default function Form({
  classes = "",
  ...props
}: Props & { classes?: string }) {
  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext<FV>();
  const { submit, isSubmitDisabled, isSubmitting } = useSubmit(props);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`${classes} w-full bg-orange-l6 dark:bg-blue-d4 grid gap-6 p-4 text-gray-d2 dark:text-white font-work`}
      autoComplete="off"
      autoSave="off"
    >
      <Tooltip {...props} />
      <TextInput<FV> name="name.first" label="First name" required />
      <TextInput<FV> name="name.last" label="Last name" required />
      <TextInput<FV> name="address.street" label="Address" required />
      <TextInput<FV>
        name="address.street"
        label="Address complement"
        required
      />
      <TextInput<FV> name="postalCode" label="Zip code" required />

      <TextInput<FV> name="city" label="City" required />
      <TextInput<FV> name="email" label="Email address" required />
      <div className="grid">
        <Label htmlFor="country" required className="mb-2">
          Country
        </Label>
        <div className="form-control rounded-md grid">
          <CountrySelector
            fieldName="country"
            classes={{
              input: textFieldStyle,
            }}
          />
          <ErrorMessage
            errors={errors}
            name="country"
            as="span"
            className="text-right text-red-l1 my-1 text-xs mr-1"
          />
        </div>
      </div>
      <TextInput<FV> name="state" label="State" />

      <button
        disabled={isSubmitDisabled}
        className="bg-orange disabled:bg-gray p-2 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {isSubmitting ? "Processing..." : "Submit"}
      </button>
    </form>
  );
}
