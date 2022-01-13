import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import { Values } from "./types";
import toCurrency from "helpers/toCurrency";

function Misc(props: { title: string; value: string; class?: string }) {
  const classes = `text-xs font-light ${props.class}`;
  return (
    <div className="flex justify-between font-heading text-opacity-80 items-center text-xs text-angel-grey mt-1 mb-1">
      <p className="text-xs font-semibold uppercase">{props.title}</p>
      <p className={classes}>{props.value}</p>
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
  return <Misc title="commission" value={`${pct_commission || 0.0} %`} />;
}

export function SwapFee() {
  const { watch } = useFormContext<Values>();
  const swap_fee = watch("swap_fee");
  return <Misc title="Swap Fee" value={`${swap_fee || 0.0} %`} />;
}

export function Ratio() {
  const { watch } = useFormContext<Values>();
  const ratio = watch("ratio");
  const is_buy = watch("is_buy");
  return (
    <>
      <Misc
        title="ratio"
        value={
          is_buy
            ? `1 UST = ${toCurrency(1 / ratio, 6, true)} HALO`
            : `1 HALO = ${toCurrency(ratio, 6, true)} UST`
        }
        class="font-semibold"
      />
      <Misc
        title=""
        value={
          is_buy
            ? `1 HALO = ${toCurrency(ratio, 6, true)} UST`
            : `1 UST = ${toCurrency(1 / ratio, 6, true)} HALO`
        }
      />
    </>
  );
}
