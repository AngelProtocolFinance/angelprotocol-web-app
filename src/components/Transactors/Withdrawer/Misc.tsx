import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import toCurrency from "helpers/toCurrency";
<<<<<<< HEAD
import { WithdrawValues } from "./types";
=======
import { CURRENCIES, MAIN_DENOM } from "constants/currency";
>>>>>>> master

function Misc(props: { title: string; value: string }) {
  return (
    <div className="flex justify-between font-heading items-center text-xs text-angel-grey/80 m-1">
      <p className="text-xs font-semibold uppercase">{props.title}</p>
      <p className="font-bold">{props.value}</p>
    </div>
  );
}

export function Fee() {
  const { fee } = useGetter((state) => state.transaction);
  return (
    <Misc
      title="tx fee"
      value={`${toCurrency(fee, 3)} ${CURRENCIES[MAIN_DENOM].ticker}`}
    />
  );
}

export function Total() {
  const { watch } = useFormContext<WithdrawValues>();
  const total_ust = watch("total_ust");
  return <Misc title="total" value={`${toCurrency(total_ust, 3)} UST`} />;
}

export function ToReceive() {
  const { watch } = useFormContext<WithdrawValues>();
  const total_receive = watch("total_receive");
  return (
    <Misc title="to receive" value={`${toCurrency(total_receive, 3)} UST`} />
  );
}
