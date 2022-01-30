import { MergeEndowment } from "services/aws/endowments/types";
import Amount from "./Amount";
import Description from "./Description";

export default function TableEntry(props: MergeEndowment) {
  return (
    <tr className="border-b">
      <td>
        <Description address={props.address} />
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
          <Amount type="10years" locked={props.locked} liquid={props.liquid} />
        </div>
      </td>
    </tr>
  );
}
