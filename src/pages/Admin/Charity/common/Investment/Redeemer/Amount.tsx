import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";

type Props = { classes?: string; symbol: string };

export default function Amount({ classes = "", symbol }: Props) {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext<FormValues>();
  return (
    <div
      aria-disabled={isSubmitting}
      className={`${classes} pb-3 relative grid grid-cols-[1fr_auto_auto] items-baseline dark:bg-blue-d6 field-container border-none`}
    >
      <label htmlFor="amount">Amount</label>
      <input
        {...register("token.amount")}
        autoComplete="off"
        id="amount"
        type="text"
        placeholder="0.0000"
        className="text-[0.9375rem] pt-3 dark:text-gray w-full text-right font-semibold"
      />
      <span className="text-gray-d1 dark:text-gray text-xs uppercase font-work ml-1">
        {symbol}
      </span>
      <ErrorMessage
        data-error
        errors={errors}
        name="token.amount"
        as="p"
        className="field-error static col-span-full"
      />
    </div>
  );
}
