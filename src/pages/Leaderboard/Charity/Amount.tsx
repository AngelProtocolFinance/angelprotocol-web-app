import toCurrency from "helpers/toCurrency";

type Props = {
  type: string;
  amount: number;
};

export default function Amount(props: Props) {
  return (
    <p className="font-heading">
      <span className="font-body uppercase text-sm text-angel-grey w-24 inline-block">
        {props.type}:
      </span>{" "}
      $ {toCurrency(props.amount, 0)}
    </p>
  );
}
