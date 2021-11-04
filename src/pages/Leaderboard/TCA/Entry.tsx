import toCurrency from "helpers/toCurrency";
import { Details } from "./types";
import { Names } from "./types";
import { memberInfo } from "./infos";
import defaultIcon from "assets/images/angelprotocol-horiz-blu.png";

type Props = { name: string; details: Details };
export default function TCAMember(props: Props) {
  const isLight = props.details.iconLight;
  console.log(isLight, props.name);
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
            src={props.details.icon}
            alt=""
            className={`w-32 h-20 m-2 object-contain ml-0 rounded-sm ${
              isLight ? "bg-blue-900" : ""
            } `}
          />
          <p className="text-angel-grey font-bold">{props.name}</p>
        </div>
      </td>
      <td className="text-angel-grey">
        $ {toCurrency(props.details.amount, 0)}
      </td>
    </tr>
  );
}
