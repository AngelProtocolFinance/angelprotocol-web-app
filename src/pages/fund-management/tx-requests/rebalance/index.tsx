import type { ILog, ITicker } from "@better-giving/nav-history";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { FieldCell } from "./field-cell";
import { type IBals, type Schema, tx_log } from "./types";

const to_bals = (from: Record<string, ITicker>): IBals => {
  return Object.entries(from).reduce((acc, [ticker, { qty }]) => {
    acc[ticker] = qty;
    return acc;
  }, {} as IBals);
};

export function RebalanceForm(props: ILog) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Schema>({
    resolver: valibotResolver(tx_log),
    defaultValues: {
      txs: [],
      bals: to_bals(props.composition),
    },
  });

  const txs = useFieldArray({ control, name: "txs" });
  return (
    <form onSubmit={handleSubmit(console.log, console.error)} className="grid">
      <div className="mb-2">
        <p className="font-heading uppercase text-sm font-bold">Tickers</p>
        <p className="font-mono text-sm text-gray">
          {Object.keys(props.composition)
            .map((x) => x.toLowerCase())
            .join(" ")}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="border border-gray-l2 min-w-full [&_th]:p-2 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l2 divide-y divide-gray-l2 [&_tr]:divide-x [&_tr]:divide-gray-l2">
          <thead className="bg-blue-l5">
            <tr className="text-xs text-left">
              <th>
                <button
                  className="align-middle"
                  type="button"
                  onClick={() =>
                    txs.append({
                      tx_id: "",
                      from_id: "",
                      from_qty: "",
                      to_id: "",
                      to_qty: "",
                      fee: "",
                      price: "",
                    })
                  }
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
                    {...register(`txs.${idx}.from_id`)}
                    error={errors.txs?.[idx]?.from_id?.message}
                  />
                  <FieldCell
                    placeholder="2.023"
                    {...register(`txs.${idx}.from_qty`)}
                    error={errors.txs?.[idx]?.from_qty?.message}
                  />

                  <FieldCell
                    placeholder="cash"
                    {...register(`txs.${idx}.to_id`)}
                    error={errors.txs?.[idx]?.to_id?.message}
                  />

                  <FieldCell
                    placeholder="100"
                    {...register(`txs.${idx}.to_qty`)}
                    error={errors.txs?.[idx]?.to_qty?.message}
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

      <button type="submit">submit</button>
    </form>
  );
}
