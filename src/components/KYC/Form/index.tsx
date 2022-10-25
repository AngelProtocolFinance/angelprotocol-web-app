import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FormValues as FV, Props } from "../types";
import CountrySelector from "components/CountrySelector";
import useSubmitKYC from "components/KYC/useSubmitKYC";
import { maskAddress } from "helpers";
import Label from "../Label";
import { TextInput, textFieldStyle } from "../TextInput";
import Tooltip from "./Tooltip";

export default function Form(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FV>();
  const { submit, isSubmitDisabled, isSubmitting } = useSubmitKYC(props);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full bg-orange-l6 dark:bg-blue-d4 grid gap-6 p-4 text-gray-d2 dark:text-white font-work"
      autoComplete="off"
      autoSave="off"
    >
      {props.type === "post-donation" ? (
        <p>
          <span className="text-xs uppercase font-bold mb-1">
            Transaction ID:
          </span>
          <span className="font-normal text-sm ml-2">
            {maskAddress(props.txHash)}
          </span>
        </p>
      ) : (
        //on-donation KYC
        //use ternary to narrow type of props
        <Tooltip {...props} isKYCRequired={props.isKYCRequired} />
      )}
      <TextInput<FV> name="email" label="Email address" required />
      <TextInput<FV> name="fullName" label="Full name" required />
      <TextInput<FV> name="streetAddress" label="Street address" required />
      <TextInput<FV> name="city" label="City" required />
      <TextInput<FV> name="state" label="State" />
      <TextInput<FV> name="zipCode" label="Zip code" required />
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
      <div className="flex items-start">
        <input
          type="checkbox"
          className="mr-2 mt-0.5"
          id="consent_marketing"
          {...register("consent_marketing")}
        />
        <label htmlFor="consent_marketing" className="font-light text-xs">
          I consent to my details being used only by Angel Protocol and the
          Charity to keep me informed of their progress and news.
        </label>
      </div>
      <div className="flex items-start">
        <input
          type="checkbox"
          className="mr-2 mt-0.5"
          id="consent_tax"
          {...register("consent_tax")}
        />
        <label htmlFor="consent_tax" className="font-light text-xs">
          I consent to allow my information to be shared with the charity for
          tax receipt processing purposes.
        </label>
      </div>
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
