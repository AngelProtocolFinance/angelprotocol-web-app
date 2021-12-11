import toCurrency from "helpers/toCurrency";

type Props = {
  type: string;
  locked: number;
  liquid: number;
};

export default function Amount(props: Props) {
  return <p>${toCurrency(props.locked + props.liquid, 0)}</p>;
}
