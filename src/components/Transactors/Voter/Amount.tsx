import { currency_text, denoms } from "constants/currency";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { VoteValues } from "./types";
import Balance from "../Staker/Balance";
import { useHaloBalance } from "services/terra/queriers";
import { Dec } from "@terra-money/terra.js";

export default function Amount() {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<VoteValues>();
  const { haloBalance } = useHaloBalance();
  const onMaxClick = () => {
    setValue("amount", new Dec(haloBalance).toFixed(3, Dec.ROUND_DOWN));
  };
  return (
    <div className="grid mb-4">
      <label
        htmlFor="amount"
        className="uppercase mb-2 flex justify-between text-angel-grey font-bold items-end"
      >
        <span>Deposit amount</span>
        <Balance amount={haloBalance} title="Balance" />
      </label>
      <div className="flex flex-wrap items-stretch border-b border-angel-blue border-opacity-20">
        <input
          {...register("amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder={currency_text[denoms.uhalo]}
          className="flex-auto p-1 pl-0 outline-none border-b border-angel-blue border-opacity-20 text-angel-grey text-lg"
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
        as="span"
        className="text-red-400 text-xs mb-1 mt-0.5"
      />
    </div>
  );
}
