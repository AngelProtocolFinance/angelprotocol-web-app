import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "components/Transactors/Donater/types";
import Currency from "./Currency";

export default function Amount() {
  const {
    register,
    formState: { errors },
  } = useFormContext<DonateValues>();

  return (
    <div className="grid">
      <label
        htmlFor="amount"
        className="text-angel-grey text-lg uppercase font-bold mb-2"
      >
        Donation Amount
      </label>
      <div className="flex items-center pr-1 justify-between gap-2 shadow-inner-white-grey rounded-md text-xl bg-light-grey/80 text-angel-grey">
        <input
          {...register("amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="0"
          className="w-2/3 p-3 bg-transparent focus:outline-none"
        />
        <Currency />
      </div>
      <div className="flex items-start justify-between mt-1">
        <ErrorMessage
          errors={errors}
          name="amount"
          as="span"
          className="text-red-400 text-xs mb-1 mt-0.5 text-right"
        />
      </div>
    </div>
  );
}
