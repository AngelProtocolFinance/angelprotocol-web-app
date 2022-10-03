import { denoms, symbols } from "constants/tokens";

export default function Balance(props: { amount: string; title: string }) {
  return (
    <p className="text-angel-grey text-xs font-light font-heading flex items-center justify-end">
      <span className="mr-1 text-xs">{props.title}</span>
      <span>
        {props.amount} {symbols[denoms.halo]}
      </span>
    </p>
  );
}
