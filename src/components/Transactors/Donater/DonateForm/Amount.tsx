import { DonateValues } from "components/Transactors/Donater/types";
import { currency_text, denoms } from "constants/currency";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
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
      <input
        {...register("amount")}
        autoComplete="off"
        id="amount"
        type="text"
        placeholder={currency_text[denom]}
        className="shadow-inner focus:outline-none p-3 rounded-md text-xl bg-gray-50 bg-opacity-80 border border-opacity-80 text-angel-grey"
      />
      <div className="flex items-start justify-between mt-1">
        <div className="flex mb-2">
          <Currency currency={denoms.uusd} />
          <Currency currency={denoms.uluna} />
          <Currency currency={denoms.ether} />
          {/* <Currency currency={denoms.btc} withTooltip /> */}
          {/* <Currency currency={denoms.sol} withTooltip /> */}
          {/* <Currency currency={denoms.uatom} withTooltip /> */}
        </div>
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
