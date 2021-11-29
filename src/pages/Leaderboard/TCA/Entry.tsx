import toCurrency from "helpers/toCurrency";
import { Details } from "./types";

type Props = { name: string; details: Details };
export default function TCAMember(props: Props) {
  const isLight = props.details.iconLight;

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
