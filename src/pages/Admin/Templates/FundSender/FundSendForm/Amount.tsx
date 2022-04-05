import { currency_text, denoms } from "constants/currency";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Currency from "./Currency";
import { FundSendValues } from "../fundSendSchema";
import Label from "pages/Admin/components/Label";

export default function Amount() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FundSendValues>();

  const denom = watch("currency");

  return (
    <div className="grid mb-4">
      <div className="flex items-baseline">
        <Label _required> Transfer amount</Label>
        <p className="">balance</p>
      </div>
      <input
        {...register("amount")}
        autoComplete="off"
        id="amount"
        type="text"
        placeholder={currency_text[denom]}
        className="shadow-inner-white-grey focus:outline-none p-3 rounded-md text-xl bg-light-grey/80 text-angel-grey"
      />
      <div className="flex items-start justify-between mt-1">
        <div className="flex mb-2">
          <Currency currency={denoms.uusd} />
          <Currency currency={denoms.uhalo} />
        </div>
        ``
        <ErrorMessage
          errors={errors}
          name="amount"
          as="span"
          className="font-mono font-semibold text-red-400 text-xs mb-1 mt-0.5 text-right"
        />
      </div>
    </div>
  );
}
