import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "../../types";
import TokensSelector from "components/TokenSelector";
import Balance from "./Balance";

export default function Amount() {
  const {
    getValues,
    watch,
    register,
    formState: { errors },
  } = useFormContext<FV>();

  const { min_donation_amnt, symbol } = watch("token");

  return (
    <div className="grid">
      <div className="flex items-baseline justify-between mb-1">
        <label htmlFor="amount" className="font-bold font-heading">
          Enter the donation amount:
        </label>
        <Balance />
      </div>

      <div className="relative grid grid-cols-[1fr_auto] items-center gap-2 py-3 px-4 bg-white dark:bg-blue-d6 nested-field">
        <input
          {...register("token.amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="0.0000"
          className="w-full text-sm dark:text-gray"
        />
        <TokensSelector<FV, "token">
          tokens={getValues("tokens")}
          fieldName="token"
          classes={{ options: "absolute right-0 top-2 z-10" }}
        />
        <ErrorMessage
          errors={errors}
          name="token.amount"
          as="p"
          className="absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2"
        />
      </div>
      <p className="text-xs mt-2">
        Minimal amount: {symbol} {min_donation_amnt}
      </p>
    </div>
  );
}
