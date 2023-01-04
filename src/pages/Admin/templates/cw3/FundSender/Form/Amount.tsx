import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FundSendValues } from "pages/Admin/types";
import { textPrimStyle } from "components/admin";
import { Label } from "components/form";
import { denoms, junoDenom, symbols } from "constants/tokens";
import Balance from "./Balance";
import Denom from "./Denom";

export default function Amount() {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<FundSendValues>();

  const denomText =
    watch("denom") === junoDenom ? symbols[junoDenom] : symbols[denoms.halo];

  return (
    <div className="grid">
      <div className="flex items-baseline justify-between">
        <Label required className="mb-2">
          Transfer amount
        </Label>
        <Balance />
      </div>
      <input
        {...register("amount")}
        autoComplete="off"
        id="amount"
        type="text"
        placeholder={denomText}
        className={textPrimStyle}
      />
      <div className="flex items-start justify-between mt-1">
        <div className="flex">
          <Denom denom={junoDenom} />
          <Denom denom={denoms.halo} />
        </div>
        <ErrorMessage
          errors={errors}
          name="amount"
          as="span"
          className="text-red dark:text-red-l2 text-xs mb-1 mt-0.5 text-right"
        />
      </div>
    </div>
  );
}
