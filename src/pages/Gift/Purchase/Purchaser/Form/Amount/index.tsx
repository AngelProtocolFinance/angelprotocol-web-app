import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "../../types";
import TokensSelector from "components/TokenSelector";
import { errorStyle } from "components/gift";
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

      <div className="relative grid grid-cols-[1fr_auto] items-center gap-2 py-3 px-4 bg-orange-l6 dark:bg-blue-d6 border border-gray-l2 dark:border-bluegray rounded">
        <input
          {...register("token.amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="0.0000"
          className="w-full text-sm bg-transparent focus:outline-none dark:text-gray dark:placeholder:text-gray-d1"
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
          className={errorStyle}
        />
      </div>

      <p className="text-xs mt-2">
        Minimal amount: {symbol} {min_donation_amnt}
      </p>
    </div>
  );
}
