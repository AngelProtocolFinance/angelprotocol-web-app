import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";
import { Values } from "./types";
import useHoldings from "./useHoldings";

export default function Amount() {
  const { register, watch } = useFormContext<Values>();
  const address = watch("receiver");
  const withdrawAmount = watch("total") || 0;
  const { liquidCW20Tokens } = useHoldings(address || "");

  return (
    <div>
      <div className="grid">
        <div className="flex flex-row justify-between">
          <label htmlFor="withdraw" className="font-bold">
            Tokens
          </label>
          <span className="text-sm">
            Available:{" "}
            <span className="font-bold">
              {toCurrency(liquidCW20Tokens! / 1e6, 3)}
            </span>
            {} tokens
          </span>
        </div>
        <input
          {...register("withdraw")}
          autoComplete="off"
          type="text"
          placeholder="Number of Tokens"
          className="p-1 pl-0 outline-none border-b border-angel-blue border-opacity-20 text-angel-grey text-xl"
          disabled={!liquidCW20Tokens}
        />
      </div>
      <div className="fee-info mt-3">
        <div className="flex justify-between">
          <p className="text-angel-grey text-xs">Withdraw Amount</p>
          <p className="text-angel-grey text-sm">{withdrawAmount} UST</p>
        </div>
      </div>
    </div>
  );
}
