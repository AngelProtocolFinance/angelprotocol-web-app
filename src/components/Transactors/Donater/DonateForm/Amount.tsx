import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { DonateValues as DV } from "../types";
import TokensSelector from "components/TokenSelector";
import Balance from "./Balance";

export default function Amount() {
  const {
    register,
    formState: { errors },
  } = useFormContext<DV>();

  return (
    <div className="grid">
      <div className="flex items-baseline justify-between mb-1">
        <label
          htmlFor="amount"
          className="text-gray-d2 text-lg uppercase font-bold"
        >
          Donation Amount
        </label>
        <Balance />
      </div>

      <div className="grid grid-cols-[1fr_auto] items-center pr-1 gap-2 shadow-inner-white rounded-md text-xl bg-gray-l2/80 text-gray-d2">
        <input
          {...register("amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="0"
          className="w-full p-3 bg-transparent focus:outline-none border-r border-gray-d2/20"
        />
        {/* <TokenSelector<DV> fieldName="token" classes="border-l-2 pl-2" /> */}
        <TokensSelector<DV> fieldName="token" />
      </div>

      <ErrorMessage
        errors={errors}
        name="amount"
        as="p"
        className="font-mono font-semibold text-red-l1 text-xs m-1 text-left"
      />
    </div>
  );
}
