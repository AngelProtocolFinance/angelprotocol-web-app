import { useEffect } from "react";
import { UseFormRegisterReturn, useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { AccountType } from "types/lists";
import { humanize } from "helpers";
import { TStrategy } from "../strats";

type Props = Pick<TStrategy, "balances"> & { classes?: string };

export default function AccountOptions({ balances, classes = "" }: Props) {
  const { register, watch, setValue, trigger, getFieldState } =
    useFormContext<FormValues>();
  const type = watch("type");

  useEffect(() => {
    const state = getFieldState("token.amount");
    setValue(
      "token.balance",
      type === "liquid" ? balances.liquid : balances.locked
    );
    if (state.isDirty) {
      trigger("token.amount");
    }
    // eslint-disable-next-line
  }, [type]);

  return (
    <div className={`grid sm:grid-cols-2 gap-3 ${classes}`}>
      <h3 className="col-span-full font-bold">
        Choose the account to invest with:
      </h3>
      <AccountOption
        register={register("type")}
        value="liquid"
        balance={balances.liquid}
      />
      <AccountOption
        register={register("type")}
        value="locked"
        balance={balances.locked}
      />
    </div>
  );
}

type OptionProps = {
  register: UseFormRegisterReturn;
  value: AccountType;
  balance: number;
};

function AccountOption({ register, value, balance }: OptionProps) {
  const id = register.name + value;
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 items-center py-3 px-[1.1125rem] rounded border border-prim">
      <input
        {...register}
        id={id}
        type="radio"
        value={value}
        className="row-span-2 radio"
      />
      <label htmlFor={id} className="text-[0.9375rem] uppercase font-bold">
        {value} account
      </label>
      <p>
        <span className="text-sm text-gray-d1 dark:text-gray mr-2">
          Free balance:
        </span>
        <span className="font-semibold text-sm">
          {humanize(balance, 2)} USDC
        </span>
      </p>
    </div>
  );
}
