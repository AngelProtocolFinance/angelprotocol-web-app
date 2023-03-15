import { UseFormRegisterReturn, useFormContext } from "react-hook-form";
import { FormValues } from "./types";

export default function LockDuration({ classes = "" }) {
  const { register, watch } = useFormContext<FormValues>();
  const type = watch("type");

  if (type === "liquid") return null;

  return (
    <div className={`grid sm:grid-cols-3 gap-3 ${classes}`}>
      <h3 className="col-span-full font-bold">Choose lock duration</h3>
      <LockOption register={register("lockPeriod")} id="duration" value={1} />
      <LockOption register={register("lockPeriod")} id="duration" value={7} />
      <LockOption register={register("lockPeriod")} id="duration" value={14} />
    </div>
  );
}

type OptionProps = {
  register: UseFormRegisterReturn;
  value: FormValues["lockPeriod"];
  id: string;
};

function LockOption({ register, id, value }: OptionProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 items-center py-3 px-[1.1125rem] rounded border border-prim">
      <input
        {...register}
        id={id + value}
        type="radio"
        value={value}
        className="row-span-2 radio"
      />
      <label
        htmlFor={id + value}
        className="text-[0.9375rem] uppercase font-bold"
      >
        {value} {value === 1 ? "day" : "days"}
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
