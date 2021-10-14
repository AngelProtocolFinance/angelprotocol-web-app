import toCurrency from "helpers/toCurrency";

type Props = {
  type: string;
  amount: number;
};

export default function Amount(props: Props) {
  return (
    <p className="">
      <span className="uppercase text-sm text-angel-grey w-16 inline-block">
        {props.type}:
      </span>{" "}
      UST {toCurrency(props.amount)}
    </p>
  );
}
