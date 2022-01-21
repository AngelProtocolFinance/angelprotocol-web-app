import { Dec } from "@terra-money/terra.js";
import { VaultInfo } from "constants/contracts";
import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";
import { Values } from "./types";

export default function Amount(props: VaultInfo & { balance: string }) {
  const { register } = useFormContext<Values>();
  const balance = new Dec(props.balance).div(1e6).toNumber();
  return (
    <div>
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
          type="text"
          placeholder="Number of Tokens"
          className="p-1 pl-0 outline-none border-b border-angel-blue border-opacity-20 text-angel-grey text-xl"
          disabled={true}
        />
      </div>
    </div>
  );
}
