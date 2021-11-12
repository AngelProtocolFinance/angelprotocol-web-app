import { Values } from "components/Donater/types";
import { currency_text, denoms } from "constants/currency";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function Amount() {
  const denomRef = useRef<denoms>(denoms.uusd);
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Values>();
  const denom = watch("currency");

  //reset amount when changing currency
  useEffect(() => {
    if (denomRef.current !== denom) {
      setValue("amount", "", { shouldValidate: false });
    }
    denomRef.current = denom;
    //eslint-disable-next-line
  }, [denom]);

  return (
    <div className="grid">
      <label
        htmlFor="amount"
        className="text-angel-grey uppercase font-bold mb-2"
      >
        Donation Amount
      </label>
      <input
        {...register("amount")}
        autoComplete="off"
        id="amount"
        type="text"
        placeholder={currency_text[denom]}
        className="p-1 pl-0 outline-none border-b border-angel-blue border-opacity-20 text-angel-grey text-lg"
      />
      <ErrorMessage
        errors={errors}
        name="amount"
        as="span"
        className="text-red-400 text-xs mb-1 mt-0.5"
      />
    </div>
  );
}
