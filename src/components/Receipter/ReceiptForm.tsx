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
      <span className="font-medium inline-block mr-2 capitalize">{name}:</span>
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
      className="bg-white grid gap-4 p-4 rounded-md w-full max-w-lg"
      autoComplete="off"
      autoSave="off"
    >
      <h1 className="font-heading text-xl font-bold text-grey-600">
        Request Receipt
      </h1>
      {receiptData.map(({ name, value }, idx) => (
        <ReceiptDetails name={name} value={value} key={idx} />
      ))}
      <TextInput
        name="email"
        id="email"
        placeholder="john@doe.com"
        label="Email Address"
      />
      <TextInput
        name="fullName"
        id="fullName"
        placeholder="John Mark"
        label="Full Name"
      />
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
          placeholder=""
          className="p-1 pl-0 outline-none border border-dark-grey border-opacity-60 text-black text-md pl-2 rounded-sm"
        />
        <ErrorMessage
          errors={errors}
          name="streetAddress"
          as="span"
          className="text-right text-red-400 text-sm mb-1 mt-0.5 mr-1"
        />
      </div>
      <TextInput name="city" id="city" placeholder="" label="City" />
      <TextInput name="state" id="state" placeholder="" label="State" />
      <TextInput name="zipCode" id="zipCode" placeholder="" label="Zip Code" />
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
            placeholder=""
            options={countries.map((item) => ({
              value: item.label,
              label: item.label,
            }))}
            control={control}
            register={register}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name="country"
          as="span"
          className="text-right text-red-400 text-sm mb-1 mt-0.5 mr-1"
        />
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
