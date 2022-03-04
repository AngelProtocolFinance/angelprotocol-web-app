import { Endowment } from "services/aws/leaderboard/types";
import Amount from "./Amount";
import Description from "./Description";
import projectFunds from "./projectFunds";
import { Link } from "react-router-dom";
import { app } from "constants/routes";

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
        <Description endowments={props} />
      </td>
      <td>
        <Link
          to={`${app.charity}/${props.endowment_address}`}
          className="col-start-2 text-lg text-angel-grey hover:text-angel-blue active:text-angel-blue font-bold pt-2 mb-1"
        >
          {props.charity_name}
        </Link>
      </td>
      <td>
        <div className="flex flex-col w-40">
          <Amount
            type="total"
            locked={props.total_lock}
            liquid={props.total_liq}
          />
        </div>
      </td>
      <td>
        <div className="flex flex-col w-40">
          <Amount type="10years" locked={locked} liquid={liquid} />
        </div>
      </td>
    </tr>
  );
}
