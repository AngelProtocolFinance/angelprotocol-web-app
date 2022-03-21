import { Link } from "react-router-dom";
import defaultIcon from "assets/images/angelprotocol-horiz-blu.png";
import { Endowment } from "services/aws/leaderboard/types";
import LazyImage from "components/LazyImage/LazyImage";
import { app } from "constants/routes";
import projectFunds from "./projectFunds";
import Amount from "./Amount";

export default function TableEntry(props: Endowment) {
  const { locked, liquid } = projectFunds(
    10,
    props.total_lock,
    props.total_liq,
    20,
    5
  );
  return (
    <tr className="border-b">
      <td>
        <LazyImage
          src={props.charity_logo || defaultIcon}
          alt=""
          classes={`self-center row-span-2 w-32 h-24 bg-white ${
            props.iconLight ? "bg-angel-blue" : ""
          } rounded-sm object-contain mr-4 m-1`}
          width="130"
          height="96"
          rounded
        />
      </td>
      <td>
        <Link
          to={`../${app.charity}/${props.endowment_address}`}
          className="col-start-2 text-lg text-angel-grey hover:text-angel-blue active:text-angel-blue font-bold pt-2 mb-1"
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
