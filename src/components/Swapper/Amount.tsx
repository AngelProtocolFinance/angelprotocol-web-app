import { currency_icons, currency_text, denoms } from "constants/currency";
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

  const is_buy = watch("is_buy");
  return (
    <div className="grid">
      <div className="flex justify-between">
        <label
          htmlFor="amount"
          className="flex items-center justify-center text-angel-blue uppercase font-heading mb-2 rounded-md"
        >
          <img
            className="w-6 h-6 mr-1 object-contain"
            src={currency_icons[is_buy ? denoms.uusd : denoms.uhalo]}
          />
          <span className="block font-bold">{is_buy ? "UST" : "HALO"}</span>
        </label>
        <Balance />
      </div>

      <input
        {...register("amount")}
        autoComplete="off"
        id="amount"
        type="text"
        placeholder={currency_text[is_buy ? denoms.uusd : denoms.uhalo]}
        className="text-right p-1 pl-0 outline-none border-b border-angel-blue border-opacity-20 text-angel-grey text-lg"
      />
      <ErrorMessage
        errors={errors}
        name="amount"
        as="span"
        className="text-right text-red-400 text-xs mb-1 mt-0.5 mr-1"
      />
    </div>
  );
}
