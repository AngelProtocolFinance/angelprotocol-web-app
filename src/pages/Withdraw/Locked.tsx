import { FaCog, FaLock } from "react-icons/fa";
import toCurrency from "helpers/toCurrency";

type LockedBalance = {
  lockedBalance: number | undefined;
};

export default function Locked(props: LockedBalance) {
  return (
    <div className="flex-none pl-2 pr-2">
      <div className="p-5 block bg-grey-accent overflow-hidden h-full rounded-lg">
        <h3 className="mb-2 text-lg font-bold uppercase">
          Locked Account
          <span className="inline-block ml-1">
            <FaLock size={16} className="" />
          </span>
          <div className="float-right">
            <span className="inline-block">
              <FaCog size={16} title="Coming Soon!" />
            </span>
          </div>
        </h3>
        <p className="text-6xl font-bold">
          $ {toCurrency(props.lockedBalance)}
        </p>
        <table className="table-auto mt-4">
          <thead>
            <tr className="text-md text-left">
              <th className="pr-8">Strategy</th>
              <th>Allocation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pr-8">Anchor Protocol</td>
              <td>100%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
