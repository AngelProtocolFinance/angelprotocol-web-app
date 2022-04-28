import { ErrorMessage } from "@hookform/error-message";
import { Dec } from "@terra-money/terra.js";
import { useFormContext } from "react-hook-form";
import { VoteValues } from "@types-component/voter";
import { useGovStakerState } from "services/terra/gov/states";
import { currency_text } from "constants/currency";
import Balance from "../Staker/Balance";

export default function Amount() {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<VoteValues>();
  const govStakerState = useGovStakerState();
  const govStakedHalo = new Dec(govStakerState.balance)
    .div(1e6)
    .toFixed(3, Dec.ROUND_DOWN);

  const onMaxClick = () => {
    setValue("amount", govStakedHalo, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="grid mb-1">
      <label
        htmlFor="amount"
        className="uppercase mb-2 flex justify-between text-angel-grey font-bold items-end"
      >
        <span>Deposit amount</span>
        <Balance amount={+govStakedHalo} title="Balance" />
      </label>
      <div className="flex flex-wrap items-stretch p-3 bg-light-grey shadow-inner-white-grey rounded-md">
        <input
          {...register("amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder={currency_text["uhalo"]}
          className="flex-auto p-1 pl-0 focus:outline-none bg-light-grey text-angel-grey text-lg"
        />
        <div
          className="p-2 outline-none text-gray-400 text-sm hover:text-gray-800 cursor-pointer"
          onClick={onMaxClick}
        >
          max
        </div>
      </div>
      <ErrorMessage
        errors={errors}
        name="amount"
        as="p"
        className="text-right text-red-400 text-xs mb-1 mt-1"
      />
    </div>
  );
}
