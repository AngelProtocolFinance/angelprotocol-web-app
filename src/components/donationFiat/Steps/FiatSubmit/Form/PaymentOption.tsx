import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { FiatDonateValues } from "../types";

function PaymentOption({ option }: { option: string }) {
  const { register, watch } = useFormContext<FiatDonateValues>();
  const isActive = watch("paymentOption") === option;

  return (
    <div className={`cursor-pointer flex w-1/2 px-2 items-center rounded`}>
      <input
        id={option}
        {...register("paymentOption")}
        value={option}
        type="radio"
        className="w-0 h-0 appearance-none"
      />
      <span
        className={`border border-white rounded-full h-4 w-4 ${
          isActive ? "bg-orange h-2 w-2" : ""
        }`}
      ></span>
      <label
        htmlFor={option}
        className="flex items-center text-sm cursor-pointer"
      >
        <span className={`ml-1.5 mt-0.5`}>{option}</span>
      </label>
    </div>
  );
}

export default memo(PaymentOption);
