import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";

const id = "__beneficiary";

export default function Beneficiary() {
  const {
    register,
    formState: { errors },
  } = useFormContext<WithdrawValues>();

  return (
    <div className="relative grid gap-3 w-full">
      <label htmlFor={id} className="font-bold font-work">
        Destination wallet
      </label>
      <input
        {...register("beneficiary")}
        id={id}
        type="text"
        autoComplete="off"
        className="flex justify-between items-center w-full p-4 border border-prim rounded bg-transparent @max-md:text-sm truncate focus:outline-none"
        placeholder="Input wallet address..."
      />
      <ErrorMessage
        errors={errors}
        name="beneficiary"
        as="span"
        className="text-right text-red dark:text-red-l2 text-xs absolute -bottom-5 right-2"
      />
    </div>
  );
}
