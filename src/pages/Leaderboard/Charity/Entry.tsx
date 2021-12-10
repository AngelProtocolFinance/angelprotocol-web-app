import { Balance } from "contracts/types";
import Amount from "./Amount";
import Description from "./Description";
import projectFunds from "./projectFunds";

type Props = {
  address: string;
  balance: Balance;
  chainID: string;
};

export default function Entry({ address, balance, chainID }: Props) {
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
        <Description address={address} chainID={chainID} />
      </td>
      <td>
        <div className="flex flex-col">
          <Amount type="principal" amount={balance.total_locked} />
          <Amount type="donations" amount={balance.total_liq} />
        </div>
      </td>
      <td>
        <div className="flex flex-col">
          <Amount type="principal" amount={locked} />
          <Amount type="donations" amount={liquid} />
        </div>
      </td>
    </tr>
  );
}
