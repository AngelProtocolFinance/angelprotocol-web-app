<<<<<<< HEAD
=======
import { DonateValues } from "components/Transactors/Donater/types";
import { CURRENCIES, denoms } from "constants/currency";
import { useFormContext } from "react-hook-form";
>>>>>>> master
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import TokenSelector from "components/TokenSelector/TokenSelector";
import { DonateValues as DV } from "components/Transactors/Donater/types";
import Balance from "./Balance";

export default function Amount() {
  const {
    register,
    formState: { errors },
  } = useFormContext<DV>();

  return (
    <div className="grid">
<<<<<<< HEAD
      <div className="flex items-baseline justify-between mb-1">
        <label
          htmlFor="amount"
          className="text-angel-grey text-lg uppercase font-bold"
        >
          Donation Amount
        </label>
        <Balance />
      </div>

      <div className="flex items-center pr-1 justify-between gap-2 shadow-inner-white-grey rounded-md text-xl bg-light-grey/80 text-angel-grey">
        <input
          {...register("amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="0"
          className="w-full p-3 bg-transparent focus:outline-none"
=======
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
        placeholder={CURRENCIES[denom].ticker}
        className="shadow-inner-white-grey focus:outline-none p-3 rounded-md text-xl bg-light-grey/80 text-angel-grey"
      />
      <div className="flex items-start justify-between mt-1">
        <div className="flex mb-2">
          {/* <Currency currency={denoms.uusd} />
          <Currency currency={denoms.uluna} /> */}
          <Currency currency={denoms.ether} />
          <Currency currency={denoms.bnb} />
          {/* <Currency currency={denoms.btc} withTooltip /> */}
          {/* <Currency currency={denoms.sol} withTooltip /> */}
          {/* <Currency currency={denoms.uatom} withTooltip /> */}
        </div>
        <ErrorMessage
          errors={errors}
          name="amount"
          as="span"
          className="text-red-400 text-xs mb-1 mt-0.5 text-right"
>>>>>>> master
        />
        <TokenSelector<DV> fieldName="token" classes="border-l-2 pl-2" />
      </div>

      <ErrorMessage
        errors={errors}
        name="amount"
        as="p"
        className="font-mono font-semibold text-red-400 text-xs m-1 text-left"
      />
    </div>
  );
}
