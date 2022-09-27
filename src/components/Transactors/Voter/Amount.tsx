import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { VoteValues } from "./types";
import { useCachedGovStaker } from "services/juno/gov/queriers";
import { condense, humanize, roundDown } from "helpers";
import { symbols } from "constants/currency";
import Balance from "../Staker/Balance";

export default function Amount() {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<VoteValues>();
  const govStakerState = useCachedGovStaker();
  const govStakedHalo = roundDown(condense(govStakerState.balance), 3);

  const onMaxClick = () => {
    setValue("amount", govStakedHalo, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="grid mb-1">
      <label htmlFor="amount" className="text-gray-d2 uppercase font-bold mb-2">
        <span>Deposit amount</span>
        <Balance amount={humanize(govStakedHalo, 3)} title="Balance" />
      </label>
      <div className="flex flex-wrap items-stretch p-3 bg-gray-l2 shadow-inner-white rounded-md">
        <input
          {...register("amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder={symbols.halo}
          className="flex-auto p-1 pl-0 focus:outline-none bg-gray-l2 text-gray-d2 text-lg"
        />
        <div
          className="p-2 outline-none text-gray text-sm hover:text-gray-d4 cursor-pointer"
          onClick={onMaxClick}
        >
          max
        </div>
      </div>
      <ErrorMessage
        errors={errors}
        name="amount"
        as="p"
        className="text-right text-red-l1 text-xs mb-1 mt-1"
      />
    </div>
  );
}
