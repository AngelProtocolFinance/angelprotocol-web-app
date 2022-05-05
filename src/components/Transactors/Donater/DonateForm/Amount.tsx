import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import TokenSelector from "components/TokenSelector/TokenSelector";
import { DonateValues as DV } from "components/Transactors/Donater/types";

export default function Amount() {
  const {
    register,
    formState: { errors },
  } = useFormContext<DV>();

  return (
    <div className="grid">
      <label
        htmlFor="amount"
        className="text-angel-grey text-lg uppercase font-bold mb-2"
      >
        Donation Amount
      </label>
      <div className="flex items-center pr-1 justify-between gap-2 shadow-inner-white-grey rounded-md text-xl bg-light-grey/80 text-angel-grey">
        <input
          {...register("amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="0"
          className="w-full p-3 bg-transparent focus:outline-none"
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
