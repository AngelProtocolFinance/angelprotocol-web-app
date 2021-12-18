import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import { Values } from "./types";

function Misc(props: { title: string; value: string }) {
  return (
    <div className="flex justify-between font-heading text-opacity-80 items-center text-xs text-angel-grey mt-1 mb-1">
      <p className="text-xs font-semibold uppercase">{props.title}</p>
      <p className="text-xs font-light">{props.value}</p>
    </div>
  );
}

export function Fee() {
  const { fee } = useGetter((state) => state.transaction);
  return <Misc title="tx fee" value={`${fee} UST`} />;
}

export function Commission() {
  const { watch } = useFormContext<Values>();
  const pct_commission = watch("pct_commission");
  return <Misc title="commission" value={`${pct_commission} %`} />;
}

export function Effect() {
  const { watch } = useFormContext<Values>();
  const pct_change = watch("pct_change");
  return (
    <div className="flex justify-between font-heading text-opacity-80 items-center text-xs text-angel-grey mb-1 border-t border-angel-blue border-opacity-20 pt-2">
      <p className="text-sm font-bold uppercase">Price impact</p>
      <p className="text-sm font-semibold">{`${pct_change} %`}</p>
    </div>
  );
}
