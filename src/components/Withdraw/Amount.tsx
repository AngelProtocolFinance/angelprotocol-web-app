import { Dec } from "@terra-money/terra.js";
import { VaultInfo, vault_addr_map } from "constants/contracts";
import { ErrorMessage } from "@hookform/error-message";
import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";
import { Values } from "./types";

export default function Amount(props: VaultInfo & { balance: string }) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<Values>();

  const balance = new Dec(props.balance).div(1e6).toNumber();
  return (
    <div className="grid">
      <div className="flex flex-row justify-between">
        <label htmlFor="withdraw" className="font-bold">
          {props.name}
        </label>
        <span className="text-sm">
          Available:{" "}
          <span className="font-bold">
            {toCurrency(balance)} {props.symbol}
          </span>
        </span>
      </div>
      <input
        {...register(props.field_id)}
        autoComplete="off"
        type="number"
        placeholder="Number of Tokens"
        className="p-1 pl-0 outline-none border-b border-angel-blue border-opacity-20 text-angel-grey text-xl"
      />
      <ErrorMessage
        errors={errors}
        name={props.field_id}
        as="span"
        className="text-right text-red-400 text-sm mb-1 mt-0.5 mr-1"
      />
    </div>
  );
}
