import { Endowment } from "services/aws/endowments/types";
import Amount from "./Amount";
import Description from "./Description";
import projectFunds from "./projectFunds";
import useLeaderboard from "./useLeaderboard";

export default function TableEntry(props: Endowment) {
  const details = useLeaderboard(props.address);
  const { locked, liquid } = projectFunds(
    10,
    details.total_lock,
    details.total_liq,
    20,
    15
  );

  return (
    <tr className="border-b">
      <td>
        <Description address={props.address} />
      </td>
      <td>
        <div className="flex flex-col w-40">
          <Amount
            type="total"
            locked={details.total_lock}
            liquid={details.total_liq}
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
