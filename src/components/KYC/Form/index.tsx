import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FormValues, Props } from "../types";
import CountrySelector from "components/CountrySelector";
import useSubmitKYC from "components/KYC/useSubmitKYC";
import { maskAddress } from "helpers";
import TextInput from "../TextInput";
import Tooltip from "./Tooltip";

export default function Form(props: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  const { submit, isSubmitDisabled, isSubmitting } = useSubmitKYC(props);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full bg-white-grey grid gap-2 p-4 text-angel-grey"
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

      <TextInput name="email" id="email" label="Email Address" required />
      <TextInput name="fullName" id="fullName" label="Full Name" required />
      <TextInput
        name="streetAddress"
        id="streetAddress"
        label="Street Address"
        required
      />
      <TextInput name="city" id="city" label="City" required />
      <TextInput name="state" id="state" label="State" />
      <TextInput name="zipCode" id="zipCode" label="Zip Code" required />
      <div className="grid">
        <label htmlFor="country" className="text-xs uppercase font-bold mb-1">
          Country <span className="text-rose-400"> *</span>
        </label>
        <div className="form-control rounded-md grid bg-white-grey">
          <CountrySelector
            fieldName="country"
            classes={{
              container: "p-3 rounded-md shadow-inner-white-grey bg-light-grey",
              input: "bg-transparent",
            }}
          />
          <ErrorMessage
            errors={errors}
            name="country"
            as="span"
            className="text-right text-red-400 my-1 text-xs mr-1"
          />
        </div>
      </div>
      <div className="my-3 flex items-start">
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
      <div className="my-3 flex items-start">
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
        className="bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {isSubmitting ? "Processing..." : "Proceed"}
      </button>
    </form>
  );
}
