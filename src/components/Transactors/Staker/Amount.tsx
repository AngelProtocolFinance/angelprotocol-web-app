import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { HaloStakingValues } from "./types";
import { condense, humanize, roundDown } from "helpers";
import { denoms, symbols } from "constants/tokens";
import Balance from "./Balance";
import useStakerBalance from "./useStakerBalance";

export default function Amount() {
  const {
    watch,
    register,
    formState: { errors },
    setValue,
  } = useFormContext<HaloStakingValues>();
  const is_stake = watch("is_stake");
  const { balance, locked } = useStakerBalance(is_stake);
  const onMaxClick = () => {
    setValue("amount", roundDown(condense(balance.sub(locked)), 3), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  return (
    <div className="grid">
      <label
        htmlFor="amount"
        className="flex justify-between text-gray-d2 font-bold items-end"
      >
        <span>{is_stake ? "Stake amount" : "Amount to withdraw"}</span>
        <Balance
          amount={humanize(condense(balance), 3, true)}
          title={is_stake ? "Balance" : "Staked"}
        />
      </label>
      {!is_stake && (
        <Balance
          amount={humanize(condense(locked), 3, true)}
          title="Vote Locked"
        />
      )}
      <span className="my-3 text-gray-d2 italic text-xs">
        There is a 7 day wait period to unstake {symbols[denoms.halo]}. You will
        not be able to claim your {symbols[denoms.halo]} until this period has
        passed.
      </span>
      <div className="flex bg-gray-l3 flex-wrap items-stretch shadow-inner-white p-2 rounded-md">
        <input
          {...register("amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder={symbols[denoms.halo]}
          className="flex-auto p-1 pl-0 focus:outline-none text-gray-d2 bg-gray-l3 text-lg"
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
