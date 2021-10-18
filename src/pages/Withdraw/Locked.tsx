import toCurrency from "helpers/toCurrency";

type LockedBalance = {
  lockedBalance: number | undefined;
};

export default function Locked(props: LockedBalance) {
  return (
    <div className="flex-auto pl-1 pr-1">
      <div className="p-4 block bg-angel-orange overflow-hidden h-full rounded-lg">
        <h3 className="mb-2 text-lg font-bold uppercase">Locked Account</h3>
        <p className="text-6xl font-bold">
          UST {toCurrency(props.lockedBalance)}
        </p>
        <table className="table-auto mt-4">
          <thead>
            <tr className="text-lg text-left">
              <th className="pr-2">Strategy</th>
              <th>Allocation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pr-2">Anchor Protocol</td>
              <td>100%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
