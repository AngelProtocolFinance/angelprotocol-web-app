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

  const { min_donation_amnt, symbol, amount } = watch("token");

  return (
    <div className="grid">
      <div className="flex items-baseline justify-between mb-1">
        <label htmlFor="amount" className="text-lg font-bold">
          Enter the donation amount:
        </label>
        <Balance />
      </div>

      <div className="relative grid grid-cols-[1fr_auto] items-center gap-2 py-3 px-4 dark:bg-blue-d7 border border-gray-l2 dark:border-bluegray-d1 rounded">
        <input
          {...register("token.amount")}
          value={amount}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="0.0000"
          className="w-full text-sm bg-transparent focus:outline-none dark:text-gray dark:placeholder:text-gray-d1"
        />
        <TokensSelector<DV>
          fieldName="token"
          classes={{ options: "absolute right-0 top-2 z-10" }}
        />
      </div>
      <div className="empty:mb-2">
        <ErrorMessage
          errors={errors}
          name="token.amount"
          as="p"
          className="text-red dark:text-red-l2 text-xs text-left my-1"
        />
      </div>
      <p className="text-xs">
        Minimal amount: {symbol} {min_donation_amnt}
      </p>
    </div>
  );
}
