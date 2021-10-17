import { Addresses } from "./types";
import { Balance } from "contracts/types";
import maskAddress from "helpers/maskAddress";
import Copier, { Addr } from "components/Copier/Copier";
import Amount from "./Amount";
import Description from "./Description";
type Props = {
  address: Addresses;
  balance: Balance;
};

export default function Entry({ address, balance }: Props) {
  return (
    <tr className="border-b">
      <td>
        <Description address={address} />
      </td>
      <td>
        <div className="flex items-center gap-2">
          <span title={address} className="text-md text-angel-grey">
            {maskAddress(address)}
          </span>
          <Copier colorClass="text-angel-grey text-sm" text={address as Addr} />
        </div>
      </td>
      <td>
        <div className="flex flex-col">
          <Amount type="locked" amount={balance.total_locked} />
          <Amount type="liquid" amount={balance.total_liq} />
        </div>
      </td>
    </tr>
  );
}
