import { FaCog } from "react-icons/fa";
import toCurrency from "helpers/toCurrency";

type LiquidBalance = {
  liquidBalance: number | undefined;
};

export default function Liquid(props: LiquidBalance) {
  return (
    <div className="flex-none pl-2 pr-2 mb-3 md:mb-0">
      <div className="p-2 md:p-5 block bg-grey-accent overflow-hidden h-full rounded-lg">
        <h3 className="mb-2 text-lg font-bold uppercase">
          Liquid Account
          <div className="float-right">
            <span className="inline-block">
              <FaCog size={16} title="Coming Soon!" />
            </span>
          </div>
        </h3>
        <p className="text-4xl md:text-5xl font-bold">
          $ {toCurrency(props.liquidBalance)}
        </p>
        <div className="grid grid-cols-1">
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
    </div>
  );
}
