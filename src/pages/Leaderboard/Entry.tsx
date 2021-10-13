import toCurrency from "helpers/toCurrency";
import { Names, pictures } from "./tcaMembers";

type Props = { name: Names; amount?: number };
export default function Entry(props: Props) {
  return (
    <tr>
      <td className="cell flex items-center">
        <img src={pictures[props.name]} alt="" className="w-12 h-12 m-4 ml-0" />
        <span className="ml-4 uppercase font-bold">{props.name}</span>
      </td>
      <td className="cell">UST {toCurrency(props.amount)}</td>
    </tr>
  );
}
