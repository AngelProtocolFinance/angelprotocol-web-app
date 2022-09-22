import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { humanize, roundDown } from "helpers";

type Props = {
  name: string;
  idx: number;
  balance: number;
};

export const FIELD_PRECISION = 6;
export default function Field({ name, idx, balance }: Props) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();

  function setMax() {
    setValue(`redeems.${idx}.amount`, roundDown(balance), {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  return (
    <div className="grid grid-cols-2 p-3 rounded-md border border-zinc-50/30 gap-x-4 relative">
      <button
        type="button"
        onClick={setMax}
        className="col-span-2 text-sm mb-2 justify-self-end hover:text-sky-500"
      >
        <span className="text-xs uppercase pr-1">balance</span>
        <span className="font-heading">{humanize(balance, 4)}</span>
      </button>
      <p className="p-3 rounded-md bg-zinc-50/5 shadow-inner">{name}</p>
      <div className="relative w-full">
        <input
          placeholder="0.0000"
          className="w-full bg-zinc-50/5 shadow-inner p-3 focus:outline-none text-lg"
          {...register(`redeems.${idx}.amount`)}
        />
        <ErrorMessage
          errors={errors}
          name={`redeems.${idx}.amount`}
          as="span"
          className="absolute right-1 bottom-1 text-xs text-rose-300"
        />
      </div>
    </div>
  );
}
