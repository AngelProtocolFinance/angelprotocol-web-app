import { currency_text, denoms } from "constants/currency";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Values } from "./types";
import Balance from "./Balance";

export default function Amount() {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<Values>();
  const is_stake = watch("is_stake");

  return (
    <div className="grid">
      <label
        htmlFor="amount"
        className="flex justify-between text-angel-grey uppercase font-bold mb-2 items-end"
      >
        <span>{is_stake ? "Stake amount" : "Amount to withdraw"}</span>
        <Balance />
      </label>
      {!is_stake && (
        <span className="my-3 text-angel-grey italic text-xs sm:text-sm">
          NOTE: There is a 7 day withdraw holding period. You will not be able
          to claim your HALO until this period has passed.
        </span>
      )}
      <input
        {...register("amount")}
        autoComplete="off"
        id="amount"
        type="text"
        placeholder={currency_text[denoms.uhalo]}
        className="p-1 pl-0 outline-none border-b border-angel-blue border-opacity-20 text-angel-grey text-lg"
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
