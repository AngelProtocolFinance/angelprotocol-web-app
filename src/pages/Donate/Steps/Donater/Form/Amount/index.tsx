import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { DonateValues as DV } from "../../types";
import TokensSelector from "components/TokenSelector";
import Balance from "./Balance";

export default function Amount() {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<DV>();

  const { min_donation_amnt, symbol } = watch("token");

  return (
    <div className="grid">
      <div className="flex items-baseline justify-between mb-1">
        <label htmlFor="amount" className="text-gray-d2 text-lg font-bold">
          Enter the donation amount:
        </label>
        <Balance />
      </div>

      <div className="grid grid-cols-[1fr_auto] items-center pr-1 gap-2 py-3 px-4 border border-gray-l2 rounded">
        <input
          {...register("token.amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder={`${min_donation_amnt}`}
          className="w-full text-sm bg-transparent focus:outline-none"
        />
        <TokensSelector<DV> fieldName="token" />
      </div>
      <div className="empty:mb-2">
        <ErrorMessage
          errors={errors}
          name="token.amount"
          as="p"
          className="text-red text-xs text-left my-1"
        />
      </div>
      <p className="text-xs text-gray-d1">
        Minimal amount: {symbol} {min_donation_amnt}
      </p>
    </div>
  );
}
