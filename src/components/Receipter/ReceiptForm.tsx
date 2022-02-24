import { useMemo } from "react";
import countryList from "react-select-country-list";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Values } from "./types";
import useReceiptForm from "components/Receipter/useReceiptForm";
import maskAddress from "helpers/maskAddress";
import TextInput from "./TextInput";
import { Selector } from "components/Selector";

type DataProps = {
  name: string;
  value: string;
};

function ReceiptDetails({ name, value }: DataProps) {
  return (
    <p>
      <span className="font-medium inline-block mr-2 mb-1 capitalize">
        {name}:
      </span>
      <span className="font-normal inline-block">{value}</span>
    </p>
  );
}

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

  const receiptData: DataProps[] = [
    {
      name: "Transaction id",
      value: maskAddress(getValues("transactionId")),
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white grid gap-2 p-4 rounded-md w-full max-w-lg max-h-75vh overflow-hidden overflow-y-auto"
      autoComplete="off"
      autoSave="off"
    >
      <h1 className="font-heading text-xl font-bold text-grey-600">
        Request Receipt
      </h1>
      {receiptData.map(({ name, value }, idx) => (
        <ReceiptDetails name={name} value={value} key={idx} />
      ))}
      <TextInput name="email" id="email" label="Email Address" />
      <TextInput name="fullName" id="fullName" label="Full Name" />
      <div className="grid">
        <label
          htmlFor="streetAddress"
          className="text-angel-grey text-xs uppercase font-bold mb-1"
        >
          Street Address
        </label>
        <textarea
          {...register("streetAddress")}
          autoComplete="off"
          id="streetAddress"
          className="p-1 pl-0 outline-none border border-dark-grey border-opacity-60 text-black text-md pl-2 rounded-sm"
        />
        <ErrorMessage
          errors={errors}
          name="streetAddress"
          as="span"
          className="text-right text-red-400 my-1 text-xs mr-1"
        />
      </div>
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
        <div className="form-control rounded-sm bg-gray-200 flex justify-between items-center text-dark-grey">
          <Selector
            name="country"
            options={countries.map((item) => ({
              value: item.label,
              label: item.label,
            }))}
            control={control}
            register={register}
            menuPlacement="top"
          />
        </div>
        <ErrorMessage
          errors={errors}
          name="country"
          as="span"
          className="text-right text-red-400 my-1 text-xs mr-1"
        />
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
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {processing ? "Processing..." : "Submit"}
      </button>
    </form>
  );
}
