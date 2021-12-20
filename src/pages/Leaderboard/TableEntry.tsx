import { Balance } from "contracts/types";
import Amount from "./Amount";
import Description from "./Description";
import projectFunds from "./projectFunds";

type Props = {
  address: string;
  balance: Balance;
};

export default function TableEntry({ address, balance }: Props) {
  const { locked, liquid } = projectFunds(
    10,
    balance.total_locked,
    balance.total_liq,
    20,
    15
  );

  return (
    <tr className="border-b">
      <td>
        <Description address={address} />
      </td>
      <td>
        <div className="flex flex-col w-40">
          <Amount
            type="total"
            locked={balance.total_locked}
            liquid={balance.total_liq}
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
