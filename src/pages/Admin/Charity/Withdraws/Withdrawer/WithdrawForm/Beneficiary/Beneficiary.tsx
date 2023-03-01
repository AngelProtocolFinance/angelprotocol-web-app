import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "../types";
import Paster from "./Paster";

const id = "__beneficiary";

export default function Beneficiary() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<WithdrawValues>();

  const handlePaste = (text: string) => setValue("beneficiary", text);

  return (
    <div className="relative grid gap-3 w-full">
      <label htmlFor={id} className="font-bold font-work">
        Destination wallet
      </label>
      <span
        className={`flex justify-between items-center p-4 ${
          errors?.beneficiary && errors.beneficiary.message
            ? "border-2 border-red dark:border-red-l2"
            : "border border-prim"
        } rounded`}
      >
        <input
          {...register("beneficiary")}
          id={id}
          type="text"
          autoComplete="off"
          className="w-full max-w-[12rem] md:max-w-xs truncate focus:outline-none"
          placeholder="Input wallet address..."
        />
        <Paster onPaste={handlePaste} />
      </span>
      <ErrorMessage
        errors={errors}
        name="beneficiary"
        as="span"
        className="text-right text-red dark:text-red-l2 text-xs absolute -bottom-5 right-2"
      />
    </div>
  );
}
