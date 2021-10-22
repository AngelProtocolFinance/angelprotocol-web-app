import toCurrency from "helpers/toCurrency";
import { Names } from "./types";
import { memberInfo } from "./infos";

type Props = { name: Names; amount?: number };
export default function TCAMember(props: Props) {
  const { icon, url } = memberInfo[props.name];
  return (
    <tr className="border-b">
      <td>
        <div className="flex items-center">
          <img src={icon} alt="" className="w-12 h-12 m-4 ml-0" />
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-4 text-angel-grey font-bold"
          >
            {props.name}
          </a>
        </div>
      </td>
      <td className="font-heading">$ {toCurrency(props.amount, 0)}</td>
    </tr>
  );
}
