import { ErrorMessage } from "@hookform/error-message";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import countryList from "react-select-country-list";
import useReceiptForm from "components/Receipter/useReceiptForm";
import Selector from "components/Selector";
import maskAddress from "helpers/maskAddress";
import TextInput from "./TextInput";
import { Values } from "./types";

export default function ReceiptForm() {
  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useFormContext<Values>();
  const { submitHandler, processing } = useReceiptForm();
  const countries = useMemo(() => countryList().getData(), []);

  const transactionId = getValues("transactionId");

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white-grey grid gap-2 p-4 rounded-md w-full max-w-lg max-h-75vh overflow-y-auto"
      autoComplete="off"
      autoSave="off"
    >
      <h1 className="font-heading font-bold text-angel-grey uppercase">
        Request Receipt
      </h1>
      <p>
        <span className="text-angel-grey text-xs uppercase font-bold mb-1">
          Transaction ID:
        </span>
        <span className="font-normal text-sm text-angel-grey ml-2">
          {maskAddress(transactionId)}
        </span>
      </p>
      <TextInput name="email" id="email" label="Email Address" />
      <TextInput name="fullName" id="fullName" label="Full Name" />
      <TextInput
        name="streetAddress"
        id="streetAddress"
        label="Street Address"
      />
      <TextInput name="city" id="city" label="City" />
      <TextInput name="state" id="state" label="State" />
      <TextInput name="zipCode" id="zipCode" label="Zip Code" />
      <div className="grid">
        <label
          htmlFor="country"
          className="text-angel-grey text-xs uppercase font-bold mb-1"
        >
          Country
        </label>
        <div className="form-control rounded-md grid bg-white-grey">
          <Selector
            name="country"
            options={countries.map((item) => ({
              value: item.label,
              label: item.label,
            }))}
            control={control}
            menuPlacement="top"
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
        <label
          htmlFor="consent_marketing"
          className="text-angel-grey font-light text-xs"
        >
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
        <label
          htmlFor="consent_tax"
          className="text-angel-grey font-light text-xs"
        >
          I consent to allow my information to be shared with the charity for
          tax receipt processing purposes.
        </label>
      </div>
      <button
        disabled={processing}
        className="bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {processing ? "Processing..." : "Submit"}
      </button>
    </form>
  );
}
