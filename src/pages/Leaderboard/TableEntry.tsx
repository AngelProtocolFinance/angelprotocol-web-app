import { Link } from "react-router-dom";
import { Endowment } from "types/aws";
import defaultIcon from "assets/images/angelprotocol-horiz-blu.png";
import LazyImage from "components/LazyImage";
import { appRoutes } from "constants/routes";
import Amount from "./Amount";
import projectFunds from "./projectFunds";

export default function TableEntry(props: Endowment) {
  const { locked, liquid } = projectFunds(
    10,
    props.total_lock,
    props.total_liq,
    20,
    5
  );
  return (
    <tr className="border-b border-black/10">
      <td>
        <LazyImage
          src={props.charity_logo || defaultIcon}
          alt=""
          classes={`self-center row-span-2 w-32 h-24 bg-white ${
            props.iconLight ? "bg-blue" : ""
          } rounded-sm object-contain mr-4 m-1`}
        />
      </td>
      <td>
        <Link
          to={`../${appRoutes.profile}/${props.endowment_address}`}
          className="col-start-2 text-lg text-gray-d2 hover:text-blue active:text-blue font-bold pt-2 mb-1"
        >
          {props.charity_name}
        </Link>
      </td>
      <td>
        <Amount
          type="total"
          locked={props.total_lock}
          liquid={props.total_liq}
        />
      </td>
      <td>
        <Amount type="10years" locked={locked} liquid={liquid} />
      </td>
    </tr>
  );
}
