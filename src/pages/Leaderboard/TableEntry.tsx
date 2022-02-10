import { Endowment } from "services/aws/leaderboard/types";
import Amount from "./Amount";
import Description from "./Description";
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
    <tr className="border-b">
      <td>
        <Description endowments={props} />
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
