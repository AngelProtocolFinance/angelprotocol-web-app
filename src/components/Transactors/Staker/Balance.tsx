import { symbols } from "constants/currency";

export default function Balance(props: { amount: string; title: string }) {
  return (
    <p className="text-gray-d2 text-xs font-light font-heading flex items-center justify-end">
      <span className="mr-1 text-xs">{props.title}</span>
      <span>
        {props.amount} {symbols.halo}
      </span>
    </p>
  );
}
