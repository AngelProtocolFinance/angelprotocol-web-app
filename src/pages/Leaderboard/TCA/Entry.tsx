import toCurrency from "helpers/toCurrency";
import { Names } from "./types";
import { memberInfo } from "./infos";
import defaultIcon from "assets/images/angelprotocol-horiz-blu.png";

type Props = { name: Names; amount?: number };
export default function TCAMember(props: Props) {
  const {
    icon = defaultIcon,
    url = "https://angelprotocol.io",
    bgClass = "bg-white",
  } = memberInfo[props.name] || {};
  return (
    <tr className="border-b">
      <td>
        <div className="flex items-center">
          <img
            src={icon}
            alt=""
            className={`w-32 m-2 mr-4 h-20 object-contain rounded-sm ${bgClass}`}
          />
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-angel-grey font-bold"
          >
            {props.name}
          </a>
        </div>
      </td>
      <td className="text-angel-grey">$ {toCurrency(props.amount, 0)}</td>
    </tr>
  );
}
