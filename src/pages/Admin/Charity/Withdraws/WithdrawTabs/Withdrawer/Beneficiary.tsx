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
    <div className="relative grid mt-6 mb-6 border-b border-zinc-900/10">
      <label
        htmlFor={id}
        className="text-gray-d2 font-bold font-heading text-sm uppercase mb-2"
      >
        Destination wallet
      </label>
      <input
        {...register("beneficiary")}
        id={id}
        type="text"
        autoComplete="off"
        className="bg-transparent focus:outline-none font-mono text-sm text-gray-d2 pb-2"
      />
      <ErrorMessage
        errors={errors}
        name="beneficiary"
        as="span"
        className="text-right text-rose-400 text-xs absolute -bottom-5 right-2"
      />
    </div>
  );
}
