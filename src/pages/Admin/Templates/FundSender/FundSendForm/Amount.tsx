import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FundSendValues } from "pages/Admin/types";
import Label from "pages/Admin/components/Label";
import { denoms } from "constants/currency";
import Balance from "./Balance";
import Currency from "./Currency";

export default function Amount() {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<FundSendValues>();

  const denomText = watch("currency") === denoms.uusd ? "UST" : "HALO";

  return (
    <div className="grid mb-4">
      <div className="flex items-baseline justify-between">
        <Label _required>Transfer amount</Label>
        <Balance />
      </div>
      <input
        {...register("amount")}
        autoComplete="off"
        id="amount"
        type="text"
        placeholder={denomText}
        className="shadow-inner-white-grey focus:outline-none p-3 rounded-md text-xl bg-light-grey/80 text-angel-grey"
      />
      <div className="flex items-start justify-between mt-1">
        <div className="flex mb-2">
          <Currency currency="uusd" />
          <Currency currency="halo" />
        </div>
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
