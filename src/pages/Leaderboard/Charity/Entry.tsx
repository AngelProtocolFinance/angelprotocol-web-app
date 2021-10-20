import { Balance } from "contracts/types";
import maskAddress from "helpers/maskAddress";
import Copier, { Addr } from "components/Copier/Copier";
import Amount from "./Amount";
import Description from "./Description";
import getFutureValue from "./getFutureValue";
type Props = {
  address: string;
  balance: Balance;
  chainID: string;
};

export default function Entry({ address, balance, chainID }: Props) {
  const future_locked = getFutureValue(10, 20, 365, balance.total_locked);
  const future_liq = getFutureValue(10, 20, 365, balance.total_liq);

  return (
    <tr className="border-b">
      <td>
        <Description address={address} />
      </td>
      <td>
        <div className="flex items-center gap-2">
          <a
            href={`https://finder.terra.money/${chainID}/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            title={address}
            className="text-md text-blue-accent"
          >
            {maskAddress(address)}
          </a>
          <Copier colorClass="text-angel-grey text-sm" text={address as Addr} />
        </div>
      </td>
      <td>
        <div className="flex flex-col">
          <Amount type="principal" amount={balance.total_locked} />
          <Amount type="donations" amount={balance.total_liq} />
        </div>
      </td>
      <td>
        <div className="flex flex-col">
          <Amount type="principal" amount={future_locked} />
          <Amount type="donations" amount={future_liq} />
        </div>
      </td>
    </tr>
  );
}
