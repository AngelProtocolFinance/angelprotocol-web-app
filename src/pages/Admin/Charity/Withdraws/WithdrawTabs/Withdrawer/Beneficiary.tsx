import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";

const id = "__beneficiary";
export default function Beneficiary({ classes = "" }: { classes?: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<WithdrawValues>();

  return (
    <div className={`${classes} relative grid border-b border-prim`}>
      <label
        htmlFor={id}
        className="font-bold font-heading text-sm uppercase mb-2"
      >
        Destination wallet
      </label>
      <input
        {...register("beneficiary")}
        id={id}
        type="text"
        autoComplete="off"
        className="bg-transparent focus:outline-none text-sm pb-2"
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
