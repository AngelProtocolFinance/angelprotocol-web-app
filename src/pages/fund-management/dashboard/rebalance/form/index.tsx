import type { IComposition } from "@better-giving/nav-history";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { to_bals } from "../helpers";
import { type FV, type Tx, fv } from "../types";
import { FieldCell } from "./field-cell";

interface Props {
  init?: FV;
  composition: IComposition;
  classes?: string;
  on_submit: (fv: FV) => void;
}

const default_tx: Tx = {
  tx_id: "",
  out_id: "",
  out_qty: "",
  in_id: "",
  in_qty: "",
  price: "",
  fee: "",
};

export function RebalanceForm({
  init,
  classes,
  composition,
  on_submit,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FV>({
    resolver: valibotResolver(fv),
    defaultValues: init || {
      txs: [default_tx],
      bals: to_bals(composition),
    },
  });

  const txs = useFieldArray({ control, name: "txs" });

  return (
    <form
      id="rebalance-form"
      onSubmit={handleSubmit((x) => on_submit(x))}
      className={`${classes} grid p-4`}
    >
      <div className="mb-2">
        <p className="font-heading uppercase text-sm font-bold">Tickers</p>
        <p className="font-mono text-sm text-gray">
          {Object.keys(composition)
            .map((x) => x.toLowerCase())
            .join(" ")}
        </p>
      </div>
      <div className="overflow-x-auto pb-4">
        <table className="border border-gray-l2 min-w-full [&_th]:p-2 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l2 divide-y divide-gray-l2 [&_tr]:divide-x [&_tr]:divide-gray-l2">
          <thead className="bg-blue-l5">
            <tr className="text-xs text-left">
              <th>
                <button
                  className="align-middle"
                  type="button"
                  onClick={() => txs.append(default_tx)}
                >
                  <PlusIcon size={16} className="stroke-green" />
                </button>
              </th>
              <th className="font-bold text-red">out</th>
              <th className="font-bold text-red">out-qty</th>
              <th className="font-bold text-green">in</th>
              <th className="font-bold text-green">in-qty</th>
              <th className="font-bold">price</th>
              <th className="font-bold">id</th>
              <th className="font-bold">fee</th>
            </tr>
          </thead>
          <tbody>
            {txs.fields.map((tx, idx) => {
              return (
                <tr key={tx.id}>
                  <td>
                    <button
                      type="button"
                      onClick={() => txs.remove(idx)}
                      className="px-2 align-middle"
                    >
                      <MinusIcon size={16} className="stroke-red" />
                    </button>
                  </td>
                  <FieldCell
                    placeholder="bndx"
                    {...register(`txs.${idx}.out_id`)}
                    error={errors.txs?.[idx]?.out_id?.message}
                  />
                  <FieldCell
                    placeholder="2.023"
                    {...register(`txs.${idx}.out_qty`)}
                    error={errors.txs?.[idx]?.out_qty?.message}
                  />

                  <FieldCell
                    placeholder="cash"
                    {...register(`txs.${idx}.in_id`)}
                    error={errors.txs?.[idx]?.in_id?.message}
                  />

                  <FieldCell
                    placeholder="100"
                    {...register(`txs.${idx}.in_qty`)}
                    error={errors.txs?.[idx]?.in_qty?.message}
                  />
                  <FieldCell
                    placeholder="49.42"
                    {...register(`txs.${idx}.price`)}
                    error={errors.txs?.[idx]?.price?.message}
                  />
                  <FieldCell
                    placeholder="tx123abc.."
                    {...register(`txs.${idx}.tx_id`)}
                    error={errors.txs?.[idx]?.tx_id?.message}
                  />
                  <FieldCell
                    placeholder="0.24"
                    {...register(`txs.${idx}.fee`)}
                    error={errors.txs?.[idx]?.fee?.message}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-red text-xs mt-1 empty:hidden">
        {errors.txs?.root?.message}
      </p>
    </form>
  );
}
