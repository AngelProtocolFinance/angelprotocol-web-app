import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { DonateValues as DV } from "../../types";
import TokensSelector from "components/TokenSelector";
import Balance from "./Balance";

export default function Amount() {
  const {
    getValues,
    watch,
    register,
    formState: { errors },
  } = useFormContext<DV>();

  const { min_donation_amnt, symbol } = watch("token");

  return (
    <div className="grid">
      <div className="flex max-sm:flex-col max-sm:items-start items-center mb-1">
        <label
          htmlFor="amount"
          className="text-lg font-bold mr-auto max-sm:mb-2"
        >
          Enter the donation amount:
        </label>
        <Balance />
      </div>

      <div className="relative grid grid-cols-[1fr_auto] items-center gap-2 px-4 dark:bg-blue-d6 field-container">
        <input
          {...register("token.amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="0.0000"
          className="w-full text-sm py-3 dark:text-gray"
        />
        <TokensSelector<DV, "token">
          tokens={getValues("tokens")}
          fieldName="token"
          classes={{ options: "absolute right-0 top-2 z-10" }}
        />
      </div>
      <div className="empty:mb-2">
        <ErrorMessage
          data-error
          errors={errors}
          name="token.amount"
          as="p"
          className="static field-error text-left my-1"
        />
      </div>
      <p className="text-xs">
        Minimal amount: {symbol} {min_donation_amnt}
      </p>
    </div>
  );
}
