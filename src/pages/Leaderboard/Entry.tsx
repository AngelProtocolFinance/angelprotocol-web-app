import toCurrency from "helpers/toCurrency";
import { Names } from "./names";
import { memberInfo } from "./infos";

type Props = { name: Names; amount?: number };
export default function Entry(props: Props) {
  const { icon, url } = memberInfo[props.name];
  return (
    <tr>
      <td className="cell flex items-center">
        <img src={icon} alt="" className="w-12 h-12 m-4 ml-0" />
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="ml-4 text-angel-grey font-bold"
        >
          {props.name}
        </a>
      </td>
      <td className="cell">UST {toCurrency(props.amount)}</td>
    </tr>
  );
}
