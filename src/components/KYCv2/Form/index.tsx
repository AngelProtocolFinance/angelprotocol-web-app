import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FormValues as FV, Props } from "../types";
import CountrySelector from "components/CountrySelector";
import { Label, TextInput, textFieldStyle } from "components/TextInput";
import Controls from "./Controls";
import Tooltip from "./Tooltip";
import useSubmit from "./useSubmit";

export default function Form({ classes = "", ...props }: Props) {
  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext<FV>();
  const submit = useSubmit(props);
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`${classes} w-full bg-orange-l6 dark:bg-blue-d4 text-gray-d2 dark:text-white font-work`}
      autoComplete="off"
      autoSave="off"
    >
      <Tooltip {...props} classes="mb-12 col-span-full" />
      <TextInput<FV> name="name.first" label="First name" />
      <TextInput<FV> name="name.last" label="Last name" />
      <TextInput<FV> name="address.street" label="Address" />
      <TextInput<FV>
        name="address.complement"
        label="Address complement"
        required={false}
      />
      <TextInput<FV> name="city" label="City" />
      <TextInput<FV> name="postalCode" label="Zip code" />
      <div className="grid">
        <Label htmlFor="country" className="mb-2">
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
      <TextInput<FV> name="state" label="State" required={false} />
      <TextInput<FV>
        name="email"
        label="Email address"
        classes={{ container: "col-span-full" }}
      />
      <Controls {...props} classes="mt-8 md:mt-12 col-span-full" />
    </form>
  );
}
