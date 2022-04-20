import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "components/Transactors/Donater/types";
import { currency_text, denoms } from "constants/currency";
import Currency from "./Currency";

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
      <div className="flex items-center pr-1 justify-between gap-2 shadow-inner-white-grey rounded-md text-xl bg-light-grey/80 text-angel-grey">
        <input
          {...register("amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder={currency_text[denom]}
          className="w-2/3 p-3 bg-transparent focus:outline-none"
        />
        <Currency />
      </div>
      <div className="flex items-start justify-between mt-1">
        {/* <div className="flex mb-2">
          <Currency currency={denoms.uusd} />
          <Currency currency={denoms.uluna} />
          <Currency currency={denoms.ether} />
          <Currency currency={denoms.bnb} />
        </div> */}
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
