import { Dec } from "@terra-money/terra.js";
import { VaultInfo } from "constants/contracts";
import { ErrorMessage } from "@hookform/error-message";
import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";
import { Values } from "./types";

export default function Amount(props: VaultInfo & { balance: string }) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<Values>();
  const balance = new Dec(props.balance).div(1e6).toNumber();

  function setMax() {
    setValue(props.field_id, toCurrency(balance, 2), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  return (
    <div className="grid my-2">
      <div className="flex flex-row justify-between">
        <label
          htmlFor={props.field_id}
          className="text-angel-grey font-bold font-heading text-sm uppercase"
        >
          {props.name}
        </label>
        <p className="text-xs text-angel-grey font-heading flex gap-1 items-baseline">
          <span>balance</span>
          <button
            tabIndex={-1}
            onClick={setMax}
            type="button"
            className="font-bold hover:text-angel-blue"
          >
            {toCurrency(balance, 2, true)} {props.symbol}
          </button>
        </p>
      </div>
      <input
        {...register(props.field_id)}
        id={props.field_id}
        autoComplete="off"
        className="p-1 pl-0 outline-none border-b border-angel-blue border-opacity-20 text-angel-grey text-xl"
      />
      <ErrorMessage
        errors={errors}
        name={props.field_id}
        as="span"
        className="text-right text-red-400 text-xs mb-1 mr-1"
      />
    </div>
  );
}
