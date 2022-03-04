import { Dec } from "@terra-money/terra.js";
import { VaultInfo } from "constants/contracts";
import { ErrorMessage } from "@hookform/error-message";
import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";
import { useBalances } from "services/terra/queriers";
import { denoms } from "constants/currency";
import { WithdrawValues } from "./types";

export default function Amount(props: VaultInfo & { balance: string }) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<WithdrawValues>();
  const balance = new Dec(props.balance).div(1e6);
  const { main: ust_balance } = useBalances(denoms.uusd);

  function setMax() {
    setValue(props.field_id, balance.toFixed(3, Dec.ROUND_DOWN), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  return (
    <div className="grid my-2 p-3 pb-1 rounded-md bg-light-grey shadow-inner-white-grey">
      <div className="flex flex-row justify-between">
        <label
          htmlFor={props.field_id}
          className="text-angel-grey font-bold font-heading text-sm uppercase"
        >
          {props.name}
        </label>
        <div className="flex flex-col items-end gap-1">
          <p className="text-xs text-angel-grey font-heading flex gap-1 items-baseline">
            <span>balance</span>
            <button
              tabIndex={-1}
              onClick={setMax}
              type="button"
              className="font-bold hover:text-angel-blue"
            >
              {toCurrency(balance.toNumber(), 3, true)} {props.symbol}
            </button>
          </p>
          <p className="text-xs text-angel-grey font-headings items-baseline">
            ~{toCurrency(ust_balance, 3, true)} UST
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2 outline-none border rounded-lg border-angel-blue border-opacity-50 mt-2 px-2">
        <input
          {...register(props.field_id)}
          id={props.field_id}
          type="number"
          autoComplete="off"
          className="p-1 pl-0 grow w-full bg-transparent outline-none text-angel-grey text-xl currency-input"
        />
        <p className="text-sm text-angel-grey font-heading flex gap-1 items-baseline">
          aUST
        </p>
      </div>
      <ErrorMessage
        errors={errors}
        name={props.field_id}
        as="span"
        className="text-right text-red-400 text-xs mb-1 mr-1"
      />
    </div>
  );
}
