import maskAddress from "helpers/maskAddress";
import { Values } from "components/Receipter/types";
import { useFormContext } from "react-hook-form";
import useReceiptForm from "components/Receipter/useReceiptForm";
import TextInput from "./TextInput";

type DataProps = {
  name: string;
  value: string;
};

function ReceiptDetails({ name, value }: DataProps) {
  return (
    <p className="text-lg border-b-2 border-grey-500 pb-1">
      <span className="inline-block mr-2 capitalize">{name}:</span>
      <span className="inline-block">{value}</span>
    </p>
  );
}

export default function ReceiptForm() {
  const {
    getValues,
    handleSubmit,
    register,
    formState: { isValid },
  } = useFormContext<Values>();
  const { submitHandler, processing } = useReceiptForm();

  const receiptData: DataProps[] = [
    {
      name: "Transaction date",
      value: new Date(getValues("transactionDate")).toDateString(),
    },
    {
      name: "Transaction id",
      value: maskAddress(getValues("transactionId")),
    },
    {
      name: "amount",
      value: `${getValues("amount")} UST`,
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white grid gap-4 p-4 rounded-md w-full max-w-lg"
      autoComplete="off"
      autoSave="off"
    >
      <h1 className="font-heading text-lg font-semibold text-grey-600">
        Request Receipt
      </h1>
      {receiptData.map(({ name, value }, idx) => (
        <ReceiptDetails name={name} value={value} key={idx} />
      ))}
      <TextInput name="email" id="email" placeholder="john@doe.com" />
      <TextInput name="fullName" id="fullName" placeholder="full Name" />
      <div className="grid">
        <textarea
          {...register("streetAddress")}
          autoComplete="off"
          id="streetAddress"
          placeholder="street Address"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <TextInput name="state" id="state" placeholder="state" />
      <TextInput name="zipCode" id="zipCode" placeholder="zip code" />
      <TextInput name="country" id="country" placeholder="country" />
      <button
        disabled={processing || !isValid}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {processing ? "processing..." : "submit"}
      </button>
    </form>
  );
}
