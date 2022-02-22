import { DonateValues } from "components/Transactors/Donater/types";
import { currency_text } from "constants/currency";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function Amount() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<DonateValues>();

  const denom = watch("currency");

  return (
    <div className="grid">
      <label
        htmlFor="amount"
        className="text-angel-grey text-lg uppercase font-bold mb-2"
      >
        Donation Amount
      </label>
      <input
        {...register("amount")}
        autoComplete="off"
        id="amount"
        type="text"
        placeholder={currency_text[denom]}
        className="p-1 pl-0 outline-none border-b border-angel-blue border-opacity-20 text-angel-grey text-xl"
      />
      <ErrorMessage
        errors={errors}
        name="amount"
        as="span"
        className="text-red-400 text-xs mb-1 mt-0.5"
      />
    </div>
  );
}
