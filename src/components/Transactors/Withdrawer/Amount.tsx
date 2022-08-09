import { ErrorMessage } from "@hookform/error-message";
import Decimal from "decimal.js";
import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { VaultField } from "types/shared/withdraw";
import toCurrency from "helpers/toCurrency";
import { denoms, symbols } from "constants/currency";

export default function Amount(props: VaultField) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<WithdrawValues>();

  const usdBalance = new Decimal(props.usdBalance).div(1e6);
  function setMax() {
    setValue(props.fieldId, usdBalance.toFixed(3, Decimal.ROUND_DOWN), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  return (
    <div className="grid my-2 p-3 pb-1 rounded-md bg-light-grey shadow-inner-white-grey">
      <div className="flex flex-row justify-between">
        <label
          htmlFor={props.fieldId}
          className="text-angel-grey font-bold font-heading text-sm uppercase"
        >
          {props.name}
        </label>
        <div className="flex flex-col items-end gap-1">
          <p className="text-xs text-angel-grey font-heading flex gap-1 items-baseline">
            <span className="uppercase text-2xs">balance</span>
            <button
              tabIndex={-1}
              onClick={setMax}
              type="button"
              className="font-bold hover:text-angel-blue"
            >
              {getDisplayAmount(usdBalance)}
            </button>
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2 outline-none mt-2">
        <input
          {...register(props.fieldId)}
          id={props.fieldId}
          type="text"
          placeholder="0.00"
          autoComplete="off"
          className="p-1 pl-0 w-full bg-light-grey outline-none text-angel-grey text-xl"
        />
      </div>
      <ErrorMessage
        errors={errors}
        name={props.fieldId}
        as="span"
        className="font-mono font-semibold text-right text-red-400 text-xs m-1"
      />
    </div>
  );
}

const getDisplayAmount = (usdBalance: Decimal) =>
  `${toCurrency(usdBalance.toNumber(), 3, true)} ${symbols[denoms.axlusdc]}`;
