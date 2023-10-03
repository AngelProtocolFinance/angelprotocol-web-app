import { UseFormRegisterReturn, useFormContext } from "react-hook-form";
import { InvestFormValues } from "../types";

export default function LockDuration({ classes = "" }) {
  const { register, watch } = useFormContext<InvestFormValues>();
  const type = watch("accountType");

  if (type === "liquid") return null;

  return (
    <div className={`grid sm:grid-cols-3 gap-3 ${classes}`}>
      <h3 className="col-span-full font-bold">Choose lock duration</h3>
      <LockOption register={register("lockPeriod")} value="1" />
      <LockOption register={register("lockPeriod")} value="7" />
      <LockOption register={register("lockPeriod")} value="14" />
    </div>
  );
}

type OptionProps = {
  register: UseFormRegisterReturn;
  value: InvestFormValues["lockPeriod"];
};

function LockOption({ register, value }: OptionProps) {
  const id = register.name + value;
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 items-center py-3 px-[1.1125rem] rounded border border-gray-l3 dark:border-bluegray">
      <input
        {...register}
        id={id}
        type="radio"
        value={value}
        className="row-span-2 radio"
      />
      <label htmlFor={id} className="text-[0.9375rem] uppercase font-bold">
        {value} {value === "1" ? "day" : "days"}
      </label>
      <p>
        <span className="text-sm text-gray-d1 dark:text-gray mr-2">
          Est. APR:
        </span>
        <span className="font-semibold text-sm">1%</span>
      </p>
    </div>
  );
}
