import { Values } from "components/Donater/types";
import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";

export default function Breakdown() {
  const { watch } = useFormContext<Values>();
  const fee = watch("fee");
  const amount = Number(watch("amount"));
  return (
    <div className="border-b border-angel-blue border-opacity-20 pb-1">
      <Entry title="tx fee" amount={fee} />
      <Entry title="total amount" amount={amount + fee} />
    </div>
  );
}

function Entry(props: { title: string; amount: number }) {
  return (
    <div className="flex justify-between items-center text-xs font-heading text-blue-accent mb-.5">
      <p className="uppercase">{props.title}</p>
      <p className="text-sm">{toCurrency(props.amount, 3)} UST</p>
    </div>
  );
}
