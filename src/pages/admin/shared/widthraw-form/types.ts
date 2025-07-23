import * as v from "valibot";
export const sources = ["liq", "lock"] as const;
const source = v.picklist(sources, "Please select source");

const bals = v.object({
  liq: v.number(),
  lock: v.number(),
});
interface Bals extends v.InferOutput<typeof bals> {}

export type Source = v.InferOutput<typeof source>;

export const amount = v.lazy((x) => {
  if (!x) return v.pipe(v.string(), v.nonEmpty("Please enter an amount"));
  return v.pipe(
    v.string(),
    v.transform((x) => +x),
    v.minValue(0, "amount must be greater than 0"),
    v.transform((x) => x.toString())
  );
});

const schema_raw = v.object({
  amount,
  source,
  /** internal  */
  bals,
});
export const schema = v.pipe(
  schema_raw,
  v.forward(
    v.partialCheck(
      [["amount"], ["bals"], ["source"]],
      ({ amount, bals, source }) => {
        const bal = bals[source];
        return +amount <= bal;
      },
      "amount exceeds balance"
    ),
    ["amount"]
  )
);

export interface FV extends v.InferOutput<typeof schema> {}

export interface Props {
  /** preset */
  from?: Source;
  amount: number;
  bals: Bals;
  onSubmit: (fv: FV) => void;
  is_submitting?: boolean;
}
